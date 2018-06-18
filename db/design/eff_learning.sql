CREATE TABLE "exam_dict" (
"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"word" TEXT NOT NULL,
"mean" TEXT NOT NULL,
"sentence" TEXT,
"frequency" INTEGER,
"add_time" TEXT
);

CREATE TABLE "exam_sctor_reading" (
"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"exam_id" INTEGER,
"title" TEXT,
"article" TEXT
);

CREATE TABLE "exam_stem" (
"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"stem_type" TEXT NOT NULL,
"sector_id" INTEGER,
"no" TEXT,
"question" TEXT NOT NULL,
"answer" TEXT,
"option_a" TEXT,
"option_b" TEXT,
"option_c" TEXT,
"option_d" TEXT,
"expression" TEXT
);

CREATE TABLE "exam" (
"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"title" TEXT
);

