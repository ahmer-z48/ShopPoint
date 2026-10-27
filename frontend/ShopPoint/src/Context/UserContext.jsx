
import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

const USERS_KEY = "shopPointDemoUsers";
const SESSION_KEY = "shopPointDemoSession";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState(() =>
    readStorage(USERS_KEY, [])
  );

  const [user, setUser] = useState(() =>
    readStorage(SESSION_KEY, null)
  );

  function register(formData) {
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (!name || !email || !formData.password) {
      return {
        success: false,
        message: "Please complete all required fields.",
      };
    }

    if (users.some((item) => item.email === email)) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      phone: formData.phone?.trim() || "",
      address: "",
    };

    const updatedUsers = [
      ...users,
      {
        ...newUser,
        demoPassword: formData.password,
      },
    ];

    setUsers(updatedUsers);
    saveStorage(USERS_KEY, updatedUsers);

    setUser(newUser);
    saveStorage(SESSION_KEY, newUser);

    return { success: true };
  }

  function login(emailInput, password) {
    const email = emailInput.trim().toLowerCase();

    const foundUser = users.find(
      (item) =>
        item.email === email &&
        item.demoPassword === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const {
      demoPassword,
      ...publicUser
    } = foundUser;

    setUser(publicUser);
    saveStorage(SESSION_KEY, publicUser);

    return { success: true };
  }

  function updateProfile(changes) {
    if (!user) return;

    const updatedUser = {
      ...user,
      name: changes.name.trim(),
      phone: changes.phone.trim(),
      address: changes.address.trim(),
    };

    const updatedUsers = users.map((item) =>
      item.id === user.id
        ? { ...item, ...updatedUser }
        : item
    );

    setUsers(updatedUsers);
    saveStorage(USERS_KEY, updatedUsers);

    setUser(updatedUser);
    saveStorage(SESSION_KEY, updatedUser);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        register,
        login,
        updateProfile,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
}
