DROP TABLE IF EXISTS `old_exam_dict`;
CREATE TABLE `old_exam_dict` (
    `id` VARCHAR(100) ,     -- ID UUID生成   
    `word` VARCHAR ,     -- 单词写法    
    `mean` VARCHAR ,     -- 词义    
    `sentence` VARCHAR ,     -- 例句    
    `add_time` DATETIME ,     -- 加入时间    
    PRIMARY KEY(id)
);


DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
    `id` VARCHAR(100) ,     -- ID UUID生成   
    `buyback_id` INT ,     -- 文章ID    
    `player_id` INT ,     -- 存档ID    
    `state` VARCHAR(50) ,     -- 回购状态    
    `hit_num` INT ,     -- 中签份数    
    `apply_num` INT ,     -- 申请份数    
    `apply_time` DATETIME ,     -- 申请时间 如何期间修改申请的麻金，该值会随之改变   
    `end_time` DATETIME ,     -- 结束时间    
    PRIMARY KEY(id)
);


DROP TABLE IF EXISTS `buyback_mark`;
CREATE TABLE `buyback_mark` (
    `id` VARCHAR(100) ,     -- ID UUID生成   
    `buyback_id` INT ,     -- 回购id    
    `start_time` DATETIME ,     -- 开始时间 为实际时间   
    `end_time` DATETIME ,     -- 结束时间 为实际时间   
    `state` VARCHAR(50) ,     -- 申请状态 ongoing，waitNext   
    PRIMARY KEY(id)
);


