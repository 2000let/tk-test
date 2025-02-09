import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routing/routes";
import { withProviders } from "@/app/providers/withProviders";
import "./styles/global.css";
import "./styles/index.css";

const App: React.FC = () => {
  const [token, setToken] = React.useState(
    localStorage.getItem("github_token")
  );

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newToken = formData.get("token") as string;

    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${newToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      const userData = await response.json();
      localStorage.setItem('github_username', userData.login);
      localStorage.setItem('github_token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Неверный токен. Пожалуйста, проверьте токен и попробуйте снова.', error);
    }
  };

  if (!token) {
    return (
      <div className="login-container">
        <h1>GitHub Repository Search</h1>
        <p>Для работы приложения требуется Personal Access Token GitHub.</p>
        <ol>
          <li>
            Перейдите в{" "}
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              настройки токенов GitHub
            </a>
          </li>
          <li>Создайте новый токен с правами на чтение репозиториев</li>
          <li>Вставьте токен в поле ниже</li>
        </ol>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="token"
            placeholder="Вставьте ваш GitHub токен"
            required
          />
          <button type="submit">Войти</button>
        </form>
      </div>
    );
  }

  return withProviders(<RouterProvider router={router} />);
};

export default App;
