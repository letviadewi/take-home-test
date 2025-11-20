import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 1024,
  });
  window.dispatchEvent(new Event("resize"));
});

jest.mock("@/hooks/queries/users", () => ({
  useUser: jest.fn(),
}));

import { useUser } from "@/hooks/queries/users";
import UsersTable from "@/features/users";

describe("UsersTable Integration", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
  });

  test("renders table with user data correctly", () => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        website: "john.com",
        phone: "123",
      },
      {
        id: 2,
        name: "Jane Roe",
        email: "jane@example.com",
        website: "jane.com",
        phone: "456",
      },
    ];

    (useUser as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockUsers,
    });

    render(<UsersTable />);
    expect(screen.getByText("User List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search users...")).toBeInTheDocument();
    expect(screen.getByText("Sort:")).toBeInTheDocument();
    const johnElements = screen.getAllByText("John Doe");
    const janeEmails = screen.getAllByText("jane@example.com");

    expect(johnElements.length).toBeGreaterThan(0);
    expect(janeEmails.length).toBeGreaterThan(0);
    expect(johnElements[0]).toBeInTheDocument();
  });

  test("handles search functionality", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        website: "john.com",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        website: "jane.com",
      },
    ];

    (useUser as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockUsers,
    });

    render(<UsersTable />);

    const searchInput = screen.getByPlaceholderText("Search users...");
    fireEvent.change(searchInput, { target: { value: "Jane" } });
    const janeElements = screen.getAllByText("Jane Smith");
    const johnElements = screen.queryAllByText("John Doe");

    expect(janeElements.length).toBeGreaterThan(0);
    expect(johnElements.length).toBe(0);
  });

  test("handles row click navigation", () => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        website: "john.com",
      },
    ];

    (useUser as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockUsers,
    });

    render(<UsersTable />);

    const johnElements = screen.getAllByText("John Doe");
    const firstRow =
      johnElements[0].closest("tr") || johnElements[0].closest("div");
    fireEvent.click(firstRow!);

    expect(mockPush).toHaveBeenCalledWith("/users/1");
  });

  test("shows loading state", () => {
    (useUser as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<UsersTable />);
    const skeletonElements = document.querySelectorAll(".animate-pulse");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  test("shows empty state when no data", () => {
    (useUser as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });

    render(<UsersTable />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("handles sort functionality", () => {
    const mockUsers = [
      { id: 1, name: "Zack", email: "zack@example.com", website: "zack.com" },
      {
        id: 2,
        name: "Alice",
        email: "alice@example.com",
        website: "alice.com",
      },
    ];

    (useUser as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockUsers,
    });

    render(<UsersTable />);
    const sortSelect = screen.getByDisplayValue("Default");
    fireEvent.change(sortSelect, { target: { value: "asc" } });
    const aliceElements = screen.getAllByText("Alice");
    expect(aliceElements[0]).toBeInTheDocument();
  });

  test("renders website links correctly", () => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        website: "john.com",
      },
    ];

    (useUser as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockUsers,
    });

    render(<UsersTable />);
    const websiteLinks = screen.getAllByText("john.com");
    websiteLinks.forEach((link) => {
      const anchor = link.closest("a");
      expect(anchor).toHaveAttribute("href", "https://john.com");
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
describe("UsersTable Responsive Behavior", () => {
  test("renders mobile layout on small screens", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    window.dispatchEvent(new Event("resize"));

    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        website: "john.com",
      },
    ];

    (useUser as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockUsers,
    });

    render(<UsersTable />);
    const mobileContainer = document.querySelector(".md\\:hidden");
    expect(mobileContainer).toBeInTheDocument();
  });
});
