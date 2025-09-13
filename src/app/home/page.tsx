import {cookies} from "next/headers";
import {checkAccess} from "@/app/api/auth";

export default async function Home() {
    const cookieAccess = await cookies()

    const token = cookieAccess.get("auth-token")?.value ?? ""
    const user = cookieAccess.get("auth-user")?.value ?? ""

    return (
        <div>
            {await checkAccess(user, token) ? <>


            </> : "FORBIDDEN"}
        </div>
    )
}