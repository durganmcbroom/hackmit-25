export async function handleLogin(
    username: string,
    password: string,
) {
    const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        throw new Error("Unauthorized.");
    }
}

export async function handleSignUp(
    username: string,
    password: string,
) {
    const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
        return
    }
    throw new Error("Unauthorized.");
}