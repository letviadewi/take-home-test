import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/queries/users", () => ({
  useDetailUser: jest.fn(),
}));

jest.mock("@/components/ui/error", () => {
  return function MockError({ showBack, onBack }: any) {
    return (
      <div data-testid="error-component">
        Error Component
        {showBack && (
          <button onClick={onBack} data-testid="error-back-button">
            Go Back
          </button>
        )}
      </div>
    );
  };
});

jest.mock("@/components/ui/skeleton/detail-skeleton", () => {
  return function MockDetailSkeleton() {
    return <div data-testid="detail-skeleton">Loading Skeleton...</div>;
  };
});

import { useDetailUser } from "@/hooks/queries/users";
import DetailUser from "@/features/users/detail";

describe("DetailUser Component", () => {
  const mockBack = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      push: mockPush,
    });
    mockBack.mockClear();
    mockPush.mockClear();
  });

  const mockUserData = {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
  };

  test("renders loading state correctly", () => {
    (useDetailUser as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<DetailUser id={1} />);

    expect(screen.getByTestId("detail-skeleton")).toBeInTheDocument();
    expect(screen.getByText("Back to list")).toBeInTheDocument();
    expect(screen.getByText("User Detail")).toBeInTheDocument();
  });

  test("renders user data correctly when loaded", () => {
    (useDetailUser as jest.Mock).mockReturnValue({
      data: mockUserData,
      isLoading: false,
      isError: false,
    });

    render(<DetailUser id={1} />);

    expect(screen.getByText("Back to list")).toBeInTheDocument();
    expect(screen.getByText("User Detail")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("1-770-736-8031 x56442")).toBeInTheDocument();

    const websiteLink = screen.getByText("hildegard.org");
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink.closest("a")).toHaveAttribute(
      "href",
      "https://hildegard.org"
    );
    expect(websiteLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(websiteLink.closest("a")).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );

    expect(screen.getByText("Romaguera-Crona")).toBeInTheDocument();
    expect(
      screen.getByText(/Multi-layered client-server neural-net/)
    ).toBeInTheDocument();

    expect(screen.getByText("Kulas Light, Apt. 556")).toBeInTheDocument();
    expect(screen.getByText("Gwenborough, 92998-3874")).toBeInTheDocument();
  });

  test("renders error state correctly", () => {
    (useDetailUser as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<DetailUser id={1} />);

    expect(screen.getByTestId("error-component")).toBeInTheDocument();
    expect(screen.getByTestId("error-back-button")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("error-back-button"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  test("back to list link works correctly", () => {
    (useDetailUser as jest.Mock).mockReturnValue({
      data: mockUserData,
      isLoading: false,
      isError: false,
    });

    render(<DetailUser id={1} />);

    const backLink = screen.getByText("Back to list");
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });

  test("handles optional data gracefully", () => {
    const userWithMissingData = {
      ...mockUserData,
      website: undefined,
      company: undefined,
      address: undefined,
    };

    (useDetailUser as jest.Mock).mockReturnValue({
      data: userWithMissingData,
      isLoading: false,
      isError: false,
    });

    render(<DetailUser id={1} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Back to list")).toBeInTheDocument();
  });

  test("applies correct styling classes", () => {
    (useDetailUser as jest.Mock).mockReturnValue({
      data: mockUserData,
      isLoading: false,
      isError: false,
    });

    render(<DetailUser id={1} />);

    const mainContainer = screen.getByText("John Doe").closest("div");
    expect(mainContainer).toHaveClass(
      "border",
      "border-gray-300",
      "bg-white",
      "p-6",
      "rounded-xl",
      "shadow-md"
    );

    const backLink = screen.getByText("Back to list");
    expect(backLink).toHaveClass(
      "inline-block",
      "p-2",
      "text-sm",
      "hover:bg-gray-300/50",
      "border-gray-300",
      "border",
      "rounded-lg"
    );

    const title = screen.getByText("User Detail");
    expect(title).toHaveClass(
      "text-2xl",
      "my-4",
      "font-semibold",
      "text-blue-500"
    );
  });

  test("renders error state correctly", () => {
    (useDetailUser as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<DetailUser id={1} />);

    expect(screen.getByTestId("error-component")).toBeInTheDocument();
    expect(screen.getByTestId("error-back-button")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("error-back-button"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});

describe("DetailUser with different IDs", () => {
  test("calls useDetailUser with correct ID", () => {
    (useDetailUser as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<DetailUser id={42} />);

    expect(useDetailUser).toHaveBeenCalledWith(42);
  });

  test("handles string ID conversion", () => {
    (useDetailUser as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<DetailUser id={Number("123")} />);

    expect(useDetailUser).toHaveBeenCalledWith(123);
  });
});

describe("DetailUser Edge Cases", () => {
  test("handles null data gracefully", () => {
    (useDetailUser as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<DetailUser id={1} />);

    expect(screen.getByText("User Detail")).toBeInTheDocument();
  });

  test("handles partial data", () => {
    const partialUserData = {
      name: "Partial User",
    };

    (useDetailUser as jest.Mock).mockReturnValue({
      data: partialUserData,
      isLoading: false,
      isError: false,
    });

    render(<DetailUser id={1} />);

    expect(screen.getByText("Partial User")).toBeInTheDocument();
  });
});
