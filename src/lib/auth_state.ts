const authStore = new Map<string, string>();

export function saveToken(token: string, username: string): void {
    authStore.set(token, username);
    console.log(`ALL TOKENS : ${authStore}`);
}

export function checkToken(token: string): boolean {
    console.log(authStore);
    return authStore.has(token)
}

export function checkUsername(username: string): string | null {
    console.log(authStore);

    for (const key of authStore.keys()) {
        if (authStore.get(key) == username) return key
    }

    return null
}