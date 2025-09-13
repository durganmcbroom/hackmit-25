'use server';

import * as fs from "node:fs/promises";
import path from "node:path";
import {cookies} from "next/headers";
import {checkToken, checkUsername, saveToken} from "@/lib/auth_state";

function userPath(username: string): string {
    return path.join(process.cwd(), "auth", username, "login.sha1")
}

async function exists(path: string): Promise<boolean> {
    try {
        await fs.access(path, fs.constants.F_OK);

        return true
    } catch (error) {
        return false
    }
}

export async function checkAccess(username: string, token: string): Promise<boolean> {
    try {
        const hash = await fs.readFile(userPath(username), "utf-8");

        return token == hash
    } catch (error) {
        return false
    }
}

export async function login(
    username: string,
    password: string
): Promise<string | null> {
    if (!await exists(userPath(username))) {
        return null
    }

    const hash = await fs.readFile(userPath(username), "utf-8");

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const digest = await crypto.subtle.digest("SHA-1", encoder.encode(password));

    if (decoder.decode(digest) == hash) {
        return hash
    }

    return null
}

export async function signup(
    username: string,
    password: string
): Promise<string> {

    if (await exists(userPath(username))) {
        throw new Error("User already exists.")
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const digest = await crypto.subtle.digest("SHA-1", encoder.encode(password));

    await fs.mkdir(path.dirname(userPath(username)), {recursive: true});
    await fs.writeFile(userPath(username), decoder.decode(digest))

    return decoder.decode(digest)
}