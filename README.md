# prisma-map-migration-gen

Make sure to install rust and cargo on your system before running this because th tree-sitter-prisma package needs to be compiled from source.

copy and paste the prisma file you want to migrate into the `from` folder, then run the script.

it will output the prisma file and the sql migration file into the `build` folder.

The script will generate a new prisma file without the @map attributes on it, and part of the SQL migration file that you can copy over to the generated migration file on your actual project.

Step 1:

In your project get all your code to work with the @map attributes on all your columns. You shouldn't need any migrations to do this.

Step 2:

Run this script. It will output two files, a schema.prisma and a migration.sql.

Step 3:

Make sure that OTHER THAN YOUR RENAMES, your schema.prisma file is in sync with the new schema by running a new migration (before worrying about the rename) you may have to do this in 2 migrations.

Step 4:

Copy the contents of build/schema.prisma to your schema.prisma file.

Step 5:

run `npx prisma migrate dev --create-only` to create a new migration without running it.

Step 6:

Replace the contents of the migration.sql file with the contents of build/migration.sql.

Step 7:

run `npx prisma migrate dev` to run the migration.
