
import { createUser } from "@/lib/user.util";

import { WebhookEvent,clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";


export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook


  console.log(req);
  
  const WEBHOOK_SECRET = "whsec_QZwT/O53lhTd6wuiIkM9LiVCgxsItcvD";

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  /* eslint-disable camelcase */
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.updated"){
    // const {id, email_addresses, first_name, last_name} = evt.data

    // const user:any = {
    //   clerkId: id,
    //   email: email_addresses[0].email_address,
    //   firstName: first_name,
    //   lastName: last_name,

    // };

    // await updateUser(user)

   

    // delete user but first have to get the userId and then check if its a mentor or mentee and then delete as well
    // search for the kind of user based on userid and delete 
    // delete the user
  }

  // user.edited

  // CREATE User in mongodb

  if (eventType === "user.created") {
    
    const { id, email_addresses, first_name, last_name } =
      evt.data;

    const user:any = {
      clerkId: id,
      email: email_addresses[0].email_address,
      firstName: first_name,
      lastName: last_name,
    };


  const newUser = await createUser(user)
  if(!newUser){
    return NextResponse.json({ message: "No user"});
  }
  
 
    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: "New user created", user: newUser });
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}



