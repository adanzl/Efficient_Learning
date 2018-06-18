/*
Navicat SQLite Data Transfer

Source Server         : Efficient_Learning
Source Server Version : 30808
Source Host           : :0

Target Server Type    : SQLite
Target Server Version : 30808
File Encoding         : 65001

Date: 2018-06-17 15:15:15
*/

PRAGMA foreign_keys = OFF;

-- ----------------------------
-- Table structure for exam_stem
-- ----------------------------
DROP TABLE IF EXISTS "main"."exam_stem";
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

-- ----------------------------
-- Records of exam_stem
-- ----------------------------
INSERT INTO "main"."exam_stem" VALUES (1, 'READING', 1, 21, 'How did Redmon find his job?', 'C', '[A] By searching openings in a job database.', '[B] By posting a matching position in a database.', '[C] By using a special service of a database.', '[D] By E-mailing his resume to a database.', null);
INSERT INTO "main"."exam_stem" VALUES (2, 'READING', 1, 22, 'Which of the following can be a disadvantage of search agents?', 'C', '[A] Lack of counseling.', '[B] Limited number of visits.', '[C] Lower efficiency.', '[D] Fewer successful matches.', null);
INSERT INTO "main"."exam_stem" VALUES (3, 'READING', 1, 23, 'The expression “tip service” (Line 4, Paragraph 3) most probably means ____.', 'C', '[A] advisory.', '[B] compensation.', '[C] interaction.', '[D] reminder.', null);
INSERT INTO "main"."exam_stem" VALUES (4, 'READING', 1, 24, 'Why does CareerSite’s agent offer each job hunter only three job options?', 'C', '[A] To focus on better job matches.', '[B] To attract more returning visits.', '[C] To reserve space for more messages.', '[D] To increase the rate of success.', null);
INSERT INTO "main"."exam_stem" VALUES (5, 'READING', 1, 25, 'Which of the following is true according to the text? ', 'C', '[A] Personal search agents are indispensable to job-hunters.', '[B] Some sites keep E-mailing job seekers to trace their demands.', '[C] Personal search agents are also helpful to those already employed.', '[D] Some agents stop sending information to people once they are employed.', null);
