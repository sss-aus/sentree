import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export function GET(request) {
  return NextResponse.json({
    status: "404",
    msg: "Access to this page is not allowed",
  });
}

export async function POST(request) {
  const { username, password, number, email } = await request.json();

  try {
    // Check if a user with the given username or email already exists
    const [userResult] = await pool.execute(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (userResult.length > 0) {
      return NextResponse.json({
        status: "400",
        msg: "Username or email already exists",
      });
    }

    // Insert new user into the database
    const [result] = await pool.execute(
      "INSERT INTO users (username, email, password, number) VALUES (?,?,?,?)",
      [username, email, password, number]
    );

    if (result.affectedRows === 1) {
      return NextResponse.json({
        status: "200",
        msg: "Register success",
        userId: result.insertId,
      });
    } else {
      return NextResponse.json({ status: "400", msg: "Unable to post" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ status: "500", msg: "Internal error" });
  }
}
