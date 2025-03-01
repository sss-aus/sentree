import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function POST(request) {
  const { username, password } = await request.json();
  console.log(username, password);
  try {
    const [result] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (result.length === 0) {
      return NextResponse.json({ status: "400", msg: "User not found" });
    }

    const user = result[0];
    if (user.password == password) {
      return NextResponse.json({ status: "200", msg: "Login sucess", user });
    } else {
      return NextResponse.json({ status: "400", msg: "Wrong password" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ status: "404", msg: "Internal error" });
  }

  //return NextResponse.json({ username, password });
}
