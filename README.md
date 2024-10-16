# prisma-map-migration-gen

Make sure to install rust and cargo on your system before running this because th tree-sitter-prisma package needs to be compiled from source.

copy and paste the prisma file you want to migrate into the `from` folder, then run the script.

it will output the prisma file and the sql migration file into the `build` folder.

The script will generate a new prisma file without the @map attributes on it, and part of the SQL migration file that you can copy over to the generated migration file on your actual project.
