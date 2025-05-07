"use server";

import { wixClientServer } from '@/lib/wixClientServer'

const UserInfo = async () => {

    const wixClient = await wixClientServer();
    const { member } = wixClient.auth.loggedIn()
        ? await wixClient.members.getCurrentMember()
        : {};



    return (
        <div>
            {member}
        </div>
    )
}

export default UserInfo
