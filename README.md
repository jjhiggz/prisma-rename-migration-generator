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

## Example

An Example would be take the following file from prisma (this is only partial I can't reveal the whole thing )

```prisma

model Restaurant {
    id         String               @id @default(cuid())
    entityType RestaurantEntityType @default(RESTAURANT)
    createdAt  DateTime             @default(now())
    updatedAt  DateTime             @updatedAt
    showMenus  Boolean              @default(false)
    order      Int

    name        String
    description String @default("")
    address     String @default("")

    tabsFontFamily           String        @default("Default") @map("tabsNavTextFontFamily")
    tabsFontFamilyMobile     String        @default("Default")
    tabsFontSize             StyleSizeType @default(DEFAULT) @map("tabsNavTextFontSize")
    tabsFontSizeMobile       StyleSizeType @default(DEFAULT) @map("tabsMobileFontSize")
    tabsTextAlignment        TextAlignment @default(DEFAULT) @map("tabsTextAlignment")
    tabsTextAlignmentMobile  TextAlignment @default(DEFAULT) @map("tabsMobileTextAlignment")
    tabsFontWeight           FontWeight    @default(DEFAULT) @map("tabsNavTextFontWeight")
    tabsFontWeightMobile     FontWeight    @default(DEFAULT)
    tabsTextTransform        TextTransform @default(DEFAULT) @map("tabsNavTextTransform")
    tabsTextTransformMobile  TextTransform @default(DEFAULT) @map("tabsNavTextTransformMobile")
    tabsFontColor            String        @default("Default") @map("tabsNavFontColor")
    tabsBackgroundColor      String        @default("Default") @map("tabsNavBackgroundColor")
    tabsBorderColor          String        @default("Default") @map("tabsNavBorderColor")
    tabsActiveColor          String        @default("Default") @map("tabsNavActiveColor")
    tabsHoverColor           String        @default("Default") @map("tabsNavHoverColor")
    tabsActiveTextColor      String        @default("Default") @map("tabsActiveTextColor")
    tabsTextHoverColor       String        @default("Default") @map("tabsTextHoverColor")
    tabsTextActiveHoverColor String        @default("Default") @map("tabsTextActiveHoverColor")

    menuBorderColor     String @default("Default")
    menuBackgroundColor String @default("Default")

    sectionHeaderFontFamily          String        @default("Default") @map("headerTextFontFamily")
    sectionHeaderFontFamilyMobile    String        @default("Default") @map("headerTextFontFamilyMobile")
    sectionHeaderFontWeight          FontWeight    @default(DEFAULT) @map("headerTextFontWeight")
    sectionHeaderFontSize            StyleSizeType @default(DEFAULT) @map("headerTextFontSize")
    sectionHeaderTextAlignment       TextAlignment @default(DEFAULT) @map("headerTextAlignment")
    sectionHeaderFontColor           String        @default("Default") @map("headerFontColor")
    sectionHeaderFontSizeMobile      StyleSizeType @default(DEFAULT) @map("headerMobileFontSize")
    sectionHeaderTextAlignmentMobile TextAlignment @default(DEFAULT) @map("headerMobileTextAlignment")
    sectionHeaderTextTransform       TextTransform @default(DEFAULT) @map("headerTextTransform")
    sectionHeaderTextTransformMobile TextTransform @default(DEFAULT) @map("headerMobileTextTransform")

    sectionGroupShowHeader                OnOffDefault    @default(DEFAULT)
    sectionGroupShowHeaderMobile          OnOffDefault    @default(DEFAULT)
    sectionGroupHeaderFontFamily          String          @default("Default")
    sectionGroupHeaderFontWeight          FontWeight      @default(DEFAULT)
    sectionGroupHeaderFontWeightMobile    FontWeight      @default(DEFAULT) @map("sectionGroupHeaderMobileFontWeight")
    sectionGroupHeaderFontSize            StyleSizeType   @default(DEFAULT)
    sectionGroupHeaderFontSizeMobile      StyleSizeType   @default(DEFAULT) @map("sectionGroupHeaderMobileFontSize")
    sectionGroupHeaderTextAlignment       TextAlignment   @default(DEFAULT)
    sectionGroupHeaderTextAlignmentMobile TextAlignment   @default(DEFAULT) @map("sectionGroupHeaderMobileTextAlignment")
    sectionGroupHeaderTextTransform       TextTransform   @default(DEFAULT)
    sectionGroupHeaderTextTransformMobile TextTransform   @default(DEFAULT) @map("sectionGroupHeaderMobileTextTransform")
    sectionGroupHeaderFontFamilyMobile    String          @default("Default")
    sectionGroupHeaderFontColor           String          @default("Default")
    sectionGroupCalloutStyle              FeaturedCallout @default(DEFAULT)
    sectionGroupCalloutStyleMobile        FeaturedCallout @default(DEFAULT) @map("sectionGroupMobileCalloutStyle")
    sectionGroupCalloutColor              String          @default("Default")
    sectionGroupHeaderSeparator           OnOffDefault    @default(DEFAULT)
    sectionGroupHeaderSeparatorMobile     OnOffDefault    @default(DEFAULT) @map("sectionGroupMobileHeaderSeparator")
    sectionGroupHeaderSeparatorColor      String          @default("Default")
    sectionGroupAfterSeparator            OnOffDefault    @default(DEFAULT) @map("sectionGroupSeparator")
    sectionGroupAfterSeparatorMobile      OnOffDefault    @default(DEFAULT) @map("sectionGroupMobileSeparator")
    sectionGroupAfterSeparatorColor       String          @default("Default") @map("sectionGroupSeparatorColor")

    itemHeaderFontFamily               String         @default("Default") @map("subHeaderTextFontFamily")
    itemHeaderFontWeight               FontWeight     @default(DEFAULT) @map("subHeaderTextFontWeight")
    itemHeaderFontSize                 StyleSizeType  @default(DEFAULT) @map("subHeaderTextFontSize")
    itemHeaderTextAlignment            TextAlignment  @default(DEFAULT) @map("subHeaderTextAlignment")
    itemHeaderFontColor                String         @default("Default") @map("subHeaderFontColor")
    itemHeaderFontSizeMobile           StyleSizeType  @default(DEFAULT) @map("subHeaderMobileFontSize")
    itemHeaderTextAlignmentMobile      TextAlignment  @default(DEFAULT) @map("subHeaderMobileTextAlignment")
    itemHeaderTextTransform            TextTransform  @default(DEFAULT) @map("subHeaderTextTransform")
    itemHeaderTextTransformMobile      TextTransform  @default(DEFAULT) @map("subheaderMobileTextTransform")
    itemHeaderFontWeightMobile         FontWeight     @default(DEFAULT) @map("itemMobileHeaderFontWeight")
    itemDescriptionFontFamily          String         @default("Default") @map("paragraphTextFontFamily")
    itemDescriptionFontFamilyMobile    String         @default("Default")
    itemDescriptionFontWeight          FontWeight     @default(DEFAULT) @map("paragraphTextFontWeight")
    itemDescriptionFontSize            StyleSizeType  @default(DEFAULT) @map("paragraphTextFontSize")
    itemDescriptionTextAlignment       TextAlignment  @default(DEFAULT) @map("paragraphTextAlignment")
    itemDescriptionFontColor           String         @default("Default") @map("paragraphFontColor")
    itemDescriptionFontSizeMobile      StyleSizeType  @default(DEFAULT) @map("paragraphMobileFontSize")
    itemDescriptionTextAlignmentMobile TextAlignment  @default(DEFAULT) @map("paragraphMobileTextAlignment")
    itemDescriptionTextTransform       TextTransform  @default(DEFAULT) @map("paragraphTextTransform")
    itemDescriptionFontWeightMobile    FontWeight     @default(DEFAULT) @map("itemMobileDescriptionFontWeight")
    itemDescriptionTextTransformMobile TextTransform  @default(DEFAULT) @map("itemMobileDescriptionTextTransform")
    itemPriceAlignmentMobile           PriceAlignment @default(DEFAULT) @map("mobileItemPricingAlignment")
    itemCalloutColor                   String         @default("Default")
    itemDefaultWidth                   ColumnWidth    @default(DEFAULT)
    itemPriceAlignment                 PriceAlignment @default(DEFAULT)

    footerFontFamily          String        @default("Default") @map("footerTextFontFamily")
    footerFontWeight          FontWeight    @default(DEFAULT) @map("footerTextFontWeight")
    footerFontSize            StyleSizeType @default(DEFAULT) @map("footerTextFontSize")
    footerTextAlignment       TextAlignment @default(DEFAULT) @map("footerTextAlignment")
    footerFontColor           String        @default("Default")
    footerTextTransform       TextTransform @default(DEFAULT)
    footerFontSizeMobile      StyleSizeType @default(DEFAULT) @map("footerMobileFontSize")
    footerTextAlignmentMobile TextAlignment @default(DEFAULT) @map("footerMobileTextAlignment")
    footerFontWeightMobile    FontWeight    @default(DEFAULT) @map("footerMobileFontWeight")
    footerTextTransformMobile TextTransform @default(DEFAULT) @map("footerMobileTextTransform")

    sectionShowHeader             OnOffDefault @default(DEFAULT)
    sectionShowHeaderMobile       OnOffDefault @default(DEFAULT) @map("sectionMobileShowHeader")
    sectionDefaultWidth           ColumnWidth  @default(DEFAULT)
    sectionHeaderFontWeightMobile FontWeight   @default(DEFAULT) @map("sectionHeaderMobileFontWeight")
    sectionCalloutColor           String       @default("Default")
    sectionHeaderSeparator        OnOffDefault @default(DEFAULT) @map("sectionHeaderSeparator")
    sectionHeaderSeparatorColor   String       @default("Default") @map("sectionHeaderSeparatorColor")
    sectionAfterSeparator         OnOffDefault @default(DEFAULT) @map("sectionAfterSeparator")
    sectionAfterSeparatorColor    String       @default("Default") @map("sectionAfterSeparatorColor")
    sectionHeaderSeparatorMobile  OnOffDefault @default(DEFAULT) @map("sectionHeaderSeparatorMobile")
    sectionAfterSeparatorMobile   OnOffDefault @default(DEFAULT) @map("sectionAfterSeparatorMobile")

    multiItemAlignment         MultiItemAlignment @default(DEFAULT)
    multiSectionAlignment      MultiItemAlignment @default(DEFAULT)
    multiSectionSeparatorColor String             @default("Default") @map("sectionSeparatorColor")
    multiSectionSeparator      OnOffDefault       @default(DEFAULT) @map("multiSectionSeparator")
    multiItemSeparator         OnOffDefault       @default(DEFAULT) @map("itemSeparators")
    multiItemSeparatorColor    String             @default("Default") @map("itemSeparatorColor")
    // These I think are unnessesary because they are already covered as separatorColor and calloutColor

    restaurantVersion RestaurantVersion[]
    menus             Menu[]

    userId                 String
    user                   User                    @relation(fields: [userId], references: [id], onDelete: Cascade)
    restaurantSubscription RestaurantSubscription?

    @@unique([userId, name])
    @@unique([userId, order])
}
```

After running `npm run compile` you will get the following files

A schema.prsima file which has...

```prisma
model Restaurant {
    id         String               @id @default(cuid())
    entityType RestaurantEntityType @default(RESTAURANT)
    createdAt  DateTime             @default(now())
    updatedAt  DateTime             @updatedAt
    showMenus  Boolean              @default(false)
    order      Int

    name        String
    description String @default("")
    address     String @default("")

    tabsFontFamily           String        @default("Default")
    tabsFontFamilyMobile     String        @default("Default")
    tabsFontSize             StyleSizeType @default(DEFAULT)
    tabsFontSizeMobile       StyleSizeType @default(DEFAULT)
    tabsTextAlignment        TextAlignment @default(DEFAULT)
    tabsTextAlignmentMobile  TextAlignment @default(DEFAULT)
    tabsFontWeight           FontWeight    @default(DEFAULT)
    tabsFontWeightMobile     FontWeight    @default(DEFAULT)
    tabsTextTransform        TextTransform @default(DEFAULT)
    tabsTextTransformMobile  TextTransform @default(DEFAULT)
    tabsFontColor            String        @default("Default")
    tabsBackgroundColor      String        @default("Default")
    tabsBorderColor          String        @default("Default")
    tabsActiveColor          String        @default("Default")
    tabsHoverColor           String        @default("Default")
    tabsActiveTextColor      String        @default("Default")
    tabsTextHoverColor       String        @default("Default")
    tabsTextActiveHoverColor String        @default("Default")

    menuBorderColor     String @default("Default")
    menuBackgroundColor String @default("Default")

    sectionHeaderFontFamily          String        @default("Default")
    sectionHeaderFontFamilyMobile    String        @default("Default")
    sectionHeaderFontWeight          FontWeight    @default(DEFAULT)
    sectionHeaderFontSize            StyleSizeType @default(DEFAULT)
    sectionHeaderTextAlignment       TextAlignment @default(DEFAULT)
    sectionHeaderFontColor           String        @default("Default")
    sectionHeaderFontSizeMobile      StyleSizeType @default(DEFAULT)
    sectionHeaderTextAlignmentMobile TextAlignment @default(DEFAULT)
    sectionHeaderTextTransform       TextTransform @default(DEFAULT)
    sectionHeaderTextTransformMobile TextTransform @default(DEFAULT)

    sectionGroupShowHeader                OnOffDefault    @default(DEFAULT)
    sectionGroupShowHeaderMobile          OnOffDefault    @default(DEFAULT)
    sectionGroupHeaderFontFamily          String          @default("Default")
    sectionGroupHeaderFontWeight          FontWeight      @default(DEFAULT)
    sectionGroupHeaderFontWeightMobile    FontWeight      @default(DEFAULT)
    sectionGroupHeaderFontSize            StyleSizeType   @default(DEFAULT)
    sectionGroupHeaderFontSizeMobile      StyleSizeType   @default(DEFAULT)
    sectionGroupHeaderTextAlignment       TextAlignment   @default(DEFAULT)
    sectionGroupHeaderTextAlignmentMobile TextAlignment   @default(DEFAULT)
    sectionGroupHeaderTextTransform       TextTransform   @default(DEFAULT)
    sectionGroupHeaderTextTransformMobile TextTransform   @default(DEFAULT)
    sectionGroupHeaderFontFamilyMobile    String          @default("Default")
    sectionGroupHeaderFontColor           String          @default("Default")
    sectionGroupCalloutStyle              FeaturedCallout @default(DEFAULT)
    sectionGroupCalloutStyleMobile        FeaturedCallout @default(DEFAULT)
    sectionGroupCalloutColor              String          @default("Default")
    sectionGroupHeaderSeparator           OnOffDefault    @default(DEFAULT)
    sectionGroupHeaderSeparatorMobile     OnOffDefault    @default(DEFAULT)
    sectionGroupHeaderSeparatorColor      String          @default("Default")
    sectionGroupAfterSeparator            OnOffDefault    @default(DEFAULT)
    sectionGroupAfterSeparatorMobile      OnOffDefault    @default(DEFAULT)
    sectionGroupAfterSeparatorColor       String          @default("Default")

    itemHeaderFontFamily               String         @default("Default")
    itemHeaderFontWeight               FontWeight     @default(DEFAULT)
    itemHeaderFontSize                 StyleSizeType  @default(DEFAULT)
    itemHeaderTextAlignment            TextAlignment  @default(DEFAULT)
    itemHeaderFontColor                String         @default("Default")
    itemHeaderFontSizeMobile           StyleSizeType  @default(DEFAULT)
    itemHeaderTextAlignmentMobile      TextAlignment  @default(DEFAULT)
    itemHeaderTextTransform            TextTransform  @default(DEFAULT)
    itemHeaderTextTransformMobile      TextTransform  @default(DEFAULT)
    itemHeaderFontWeightMobile         FontWeight     @default(DEFAULT)
    itemDescriptionFontFamily          String         @default("Default")
    itemDescriptionFontFamilyMobile    String         @default("Default")
    itemDescriptionFontWeight          FontWeight     @default(DEFAULT)
    itemDescriptionFontSize            StyleSizeType  @default(DEFAULT)
    itemDescriptionTextAlignment       TextAlignment  @default(DEFAULT)
    itemDescriptionFontColor           String         @default("Default")
    itemDescriptionFontSizeMobile      StyleSizeType  @default(DEFAULT)
    itemDescriptionTextAlignmentMobile TextAlignment  @default(DEFAULT)
    itemDescriptionTextTransform       TextTransform  @default(DEFAULT)
    itemDescriptionFontWeightMobile    FontWeight     @default(DEFAULT)
    itemDescriptionTextTransformMobile TextTransform  @default(DEFAULT)
    itemPriceAlignmentMobile           PriceAlignment @default(DEFAULT)
    itemCalloutColor                   String         @default("Default")
    itemDefaultWidth                   ColumnWidth    @default(DEFAULT)
    itemPriceAlignment                 PriceAlignment @default(DEFAULT)

    footerFontFamily          String        @default("Default")
    footerFontWeight          FontWeight    @default(DEFAULT)
    footerFontSize            StyleSizeType @default(DEFAULT)
    footerTextAlignment       TextAlignment @default(DEFAULT)
    footerFontColor           String        @default("Default")
    footerTextTransform       TextTransform @default(DEFAULT)
    footerFontSizeMobile      StyleSizeType @default(DEFAULT)
    footerTextAlignmentMobile TextAlignment @default(DEFAULT)
    footerFontWeightMobile    FontWeight    @default(DEFAULT)
    footerTextTransformMobile TextTransform @default(DEFAULT)

    sectionShowHeader             OnOffDefault @default(DEFAULT)
    sectionShowHeaderMobile       OnOffDefault @default(DEFAULT)
    sectionDefaultWidth           ColumnWidth  @default(DEFAULT)
    sectionHeaderFontWeightMobile FontWeight   @default(DEFAULT)
    sectionCalloutColor           String       @default("Default")
    sectionHeaderSeparator        OnOffDefault @default(DEFAULT)
    sectionHeaderSeparatorColor   String       @default("Default")
    sectionAfterSeparator         OnOffDefault @default(DEFAULT)
    sectionAfterSeparatorColor    String       @default("Default")
    sectionHeaderSeparatorMobile  OnOffDefault @default(DEFAULT)
    sectionAfterSeparatorMobile   OnOffDefault @default(DEFAULT)

    multiItemAlignment         MultiItemAlignment @default(DEFAULT)
    multiSectionAlignment      MultiItemAlignment @default(DEFAULT)
    multiSectionSeparatorColor String             @default("Default")
    multiSectionSeparator      OnOffDefault       @default(DEFAULT)
    multiItemSeparator         OnOffDefault       @default(DEFAULT)
    multiItemSeparatorColor    String             @default("Default")
    // These I think are unnessesary because they are already covered as separatorColor and calloutColor

    restaurantVersion RestaurantVersion[]
    menus             Menu[]

    userId                 String
    user                   User                    @relation(fields: [userId], references: [id], onDelete: Cascade)
    restaurantSubscription RestaurantSubscription?

    @@unique([userId, name])
    @@unique([userId, order])
}
```

and also a migration.sql file which has...

```sql
ALTER TABLE "Restaurant" RENAME COLUMN "tabsNavTextFontFamily" TO "tabsFontFamily";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsNavTextFontSize" TO "tabsFontSize";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsMobileFontSize" TO "tabsFontSizeMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsMobileTextAlignment" TO "tabsTextAlignmentMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsNavTextFontWeight" TO "tabsFontWeight";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsNavTextTransform" TO "tabsTextTransform";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsNavTextTransformMobile" TO "tabsTextTransformMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsNavFontColor" TO "tabsFontColor";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsNavBackgroundColor" TO "tabsBackgroundColor";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsNavBorderColor" TO "tabsBorderColor";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsNavActiveColor" TO "tabsActiveColor";
ALTER TABLE "Restaurant" RENAME COLUMN "tabsNavHoverColor" TO "tabsHoverColor";
ALTER TABLE "Restaurant" RENAME COLUMN "headerTextFontFamily" TO "sectionHeaderFontFamily";
ALTER TABLE "Restaurant" RENAME COLUMN "headerTextFontFamilyMobile" TO "sectionHeaderFontFamilyMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "headerTextFontWeight" TO "sectionHeaderFontWeight";
ALTER TABLE "Restaurant" RENAME COLUMN "headerTextFontSize" TO "sectionHeaderFontSize";
ALTER TABLE "Restaurant" RENAME COLUMN "headerTextAlignment" TO "sectionHeaderTextAlignment";
ALTER TABLE "Restaurant" RENAME COLUMN "headerFontColor" TO "sectionHeaderFontColor";
ALTER TABLE "Restaurant" RENAME COLUMN "headerMobileFontSize" TO "sectionHeaderFontSizeMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "headerMobileTextAlignment" TO "sectionHeaderTextAlignmentMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "headerTextTransform" TO "sectionHeaderTextTransform";
ALTER TABLE "Restaurant" RENAME COLUMN "headerMobileTextTransform" TO "sectionHeaderTextTransformMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionGroupHeaderMobileFontWeight" TO "sectionGroupHeaderFontWeightMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionGroupHeaderMobileFontSize" TO "sectionGroupHeaderFontSizeMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionGroupHeaderMobileTextAlignment" TO "sectionGroupHeaderTextAlignmentMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionGroupHeaderMobileTextTransform" TO "sectionGroupHeaderTextTransformMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionGroupMobileCalloutStyle" TO "sectionGroupCalloutStyleMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionGroupMobileHeaderSeparator" TO "sectionGroupHeaderSeparatorMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionGroupSeparator" TO "sectionGroupAfterSeparator";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionGroupMobileSeparator" TO "sectionGroupAfterSeparatorMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionGroupSeparatorColor" TO "sectionGroupAfterSeparatorColor";
ALTER TABLE "Restaurant" RENAME COLUMN "subHeaderTextFontFamily" TO "itemHeaderFontFamily";
ALTER TABLE "Restaurant" RENAME COLUMN "subHeaderTextFontWeight" TO "itemHeaderFontWeight";
ALTER TABLE "Restaurant" RENAME COLUMN "subHeaderTextFontSize" TO "itemHeaderFontSize";
ALTER TABLE "Restaurant" RENAME COLUMN "subHeaderTextAlignment" TO "itemHeaderTextAlignment";
ALTER TABLE "Restaurant" RENAME COLUMN "subHeaderFontColor" TO "itemHeaderFontColor";
ALTER TABLE "Restaurant" RENAME COLUMN "subHeaderMobileFontSize" TO "itemHeaderFontSizeMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "subHeaderMobileTextAlignment" TO "itemHeaderTextAlignmentMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "subHeaderTextTransform" TO "itemHeaderTextTransform";
ALTER TABLE "Restaurant" RENAME COLUMN "subheaderMobileTextTransform" TO "itemHeaderTextTransformMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "itemMobileHeaderFontWeight" TO "itemHeaderFontWeightMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "paragraphTextFontFamily" TO "itemDescriptionFontFamily";
ALTER TABLE "Restaurant" RENAME COLUMN "paragraphTextFontWeight" TO "itemDescriptionFontWeight";
ALTER TABLE "Restaurant" RENAME COLUMN "paragraphTextFontSize" TO "itemDescriptionFontSize";
ALTER TABLE "Restaurant" RENAME COLUMN "paragraphTextAlignment" TO "itemDescriptionTextAlignment";
ALTER TABLE "Restaurant" RENAME COLUMN "paragraphFontColor" TO "itemDescriptionFontColor";
ALTER TABLE "Restaurant" RENAME COLUMN "paragraphMobileFontSize" TO "itemDescriptionFontSizeMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "paragraphMobileTextAlignment" TO "itemDescriptionTextAlignmentMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "paragraphTextTransform" TO "itemDescriptionTextTransform";
ALTER TABLE "Restaurant" RENAME COLUMN "itemMobileDescriptionFontWeight" TO "itemDescriptionFontWeightMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "itemMobileDescriptionTextTransform" TO "itemDescriptionTextTransformMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "mobileItemPricingAlignment" TO "itemPriceAlignmentMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "footerTextFontFamily" TO "footerFontFamily";
ALTER TABLE "Restaurant" RENAME COLUMN "footerTextFontWeight" TO "footerFontWeight";
ALTER TABLE "Restaurant" RENAME COLUMN "footerTextFontSize" TO "footerFontSize";
ALTER TABLE "Restaurant" RENAME COLUMN "footerMobileFontSize" TO "footerFontSizeMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "footerMobileTextAlignment" TO "footerTextAlignmentMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "footerMobileFontWeight" TO "footerFontWeightMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "footerMobileTextTransform" TO "footerTextTransformMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionMobileShowHeader" TO "sectionShowHeaderMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionHeaderMobileFontWeight" TO "sectionHeaderFontWeightMobile";
ALTER TABLE "Restaurant" RENAME COLUMN "sectionSeparatorColor" TO "multiSectionSeparatorColor";
ALTER TABLE "Restaurant" RENAME COLUMN "itemSeparators" TO "multiItemSeparator";
ALTER TABLE "Restaurant" RENAME COLUMN "itemSeparatorColor" TO "multiItemSeparatorColor";
```

The rest is up to you <3
