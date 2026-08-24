// 1. Implementar alternância visual de tema claro/escuro quando o controle existir.
// 2. Carregar indicadores reais da plataforma quando houver API.
// 3. Validar links de cadastro e login antes da publicação final.
// 4. Integrar ícones decorativos de forma acessível se a biblioteca visual for mantida.
// 5. Registrar eventos de CTA apenas quando o backend/analytics for definido.

// Toggle Tema Dark/Light
const themeButton = document.querySelector("#theme-toggle");

themeButton.addEventListener("click", () => 
{
    document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === "light"
        ? "dark"
        : "light";
});