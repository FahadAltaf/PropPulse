import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase-auth-client';
import { usersService } from '@/modules/users';
import { rolesService } from '@/modules/roles';

export async function POST(request: NextRequest) {
  try {
    const { email, name, phoneNumber } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user already exists using admin client
    const { data: existingUsers, error: checkError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (checkError) {
      console.error('Error checking existing users:', checkError);
      return NextResponse.json(
        { error: 'Failed to check user existence' },
        { status: 500 }
      );
    }

    const userExists = existingUsers.users.some(user => user.email === email);

    if (userExists) {
      return NextResponse.json({ 
        success: true, 
        userExists: true,
        message: 'User already exists'
      });
    }

    // User doesn't exist, create user without email confirmation using admin client
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      email_confirm: true, // Auto-confirm email - no verification needed
    });

    if (createError) {
      console.error('Error creating user:', createError);
      return NextResponse.json(
        { error: createError.message },
        { status: 400 }
      );
    }


    // Create user profile in users table
    try {
      const roleId = await rolesService.getRoleByName();
      const payload = {
        id: newUser.user.id,
        email: newUser.user.email,
        role_id: roleId,
        first_name: name.split(" ")[0] ,
        last_name: name.split(" ")[1] || "",
        full_name: name,
        is_active: true,
      };
      await usersService.insertUser(payload);
      console.log('User profile created successfully');
    } catch (profileError) {
      console.error('Error creating user profile:', profileError);
      // Don't fail the request if profile creation fails
    }

    return NextResponse.json({ 
      success: true, 
      userExists: false,
      userId: newUser.user.id,
      message: 'User created successfully'
    });
  } catch (error: any) {
    console.error('Error in create-user route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

