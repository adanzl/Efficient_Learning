# -*- coding: UTF-8 -*-
# import xdrlib,sysp
import xlrd
import sys
import random
import os

scriptDir = os.path.split(os.path.realpath(__file__))[0]
path = scriptDir + "\\gameserver"
sqlPath = path + '\\gameserver.sql' #生成SQL文件的位置

class FileFilt:
    fileList = []
    counter = 0
    def __init__(self):
        pass
    def FindFile(self,dirr,filtrate = 1):
        for s in os.listdir(dirr):
            newDir = os.path.join(dirr,s)
            if os.path.isfile(newDir):
                if newDir and(os.path.splitext(newDir)[1] in ['.xlsx']):
                    self.fileList.append(newDir)
                    self.counter+=1

##打开excel文件
def open_excel(filePath):
    try:
        return xlrd.open_workbook(filePath)
    except Exception,e:
        print str(e)

##获取excel表中每一列的数据
def create_table(filePath, file):
    data = open_excel(filePath)
    page = data.sheet_by_index(0)
    rows = page.nrows
    cols = page.ncols
    tableName = ''
    indexColumnNames = []
    primaryKeys = []
    for i in xrange(5, rows):
        if page.cell(i, 0).value == ">>>":
            for j in xrange(i + 1, rows):
                if j == (i + 1):
                    tableName = page.cell(j, 1).value
                    file.write("DROP TABLE IF EXISTS `%s`;" %(page.cell(j, 1).value) + '\n')
                    file.write("CREATE TABLE `%s` (" %(page.cell(j, 1).value) + '\n')
                    continue
                if j == (i + 2):
                    continue
                if page.cell(j, 0).value == "<<<":
                    break
                if page.cell(j + 1, 0).value == "<<<":
                    if page.cell(j, 5).value:
                        primaryKeys.append(page.cell(j, 1).value)
                    file.write(create_table_column(page, j) + '\n')
                    if page.cell(j, 6).value:
                        indexColumnNames.append(page.cell(j, 1).value)
                else:
                    if page.cell(j, 5).value:
                        primaryKeys.append(page.cell(j, 1).value)
                    file.write(create_table_column(page, j) + '\n')
                    if page.cell(j, 6).value:
                        indexColumnNames.append(page.cell(j, 1).value)

        if page.cell(i, 0).value == "<<<":
            file.write(create_table_primary_key(primaryKeys) + '\n')
            file.write(");" + '\n')
            # if indexColumnNames and tableName:
            #     file.write("\n")
            #     file.write(create_tabel_index(indexColumnNames, tableName, file) + '\n')
            file.write("\n" + '\n')
            indexColumnNames = []
            primaryKeys = []


def create_table_column(page, j):
    valueType = page.cell(j, 2).value
    if page.cell(j, 3).value:
        valueType = ("%s(%d)") %(page.cell(j, 2).value, int(page.cell(j, 3).value))

    defaultValue = ""
    if page.cell(j, 4).value:
        defaultValue = "DEFAULT %s" %(page.cell(j, 4).value)

    annotation = "    -- %s %s" %(page.cell(j, 0).value, page.cell(j, 7).value)

    return "    `%s` %s %s, %s   " %(page.cell(j, 1).value, valueType, defaultValue, annotation)

def create_table_primary_key(primaryKeys):
    keys = primaryKeys[0]
    for key in primaryKeys:
        if keys == key:
            continue
        keys += ', '+ key
    return "    PRIMARY KEY(%s)" %(keys)

def create_tabel_index(indexColumnNames, tableName, file):
    if indexColumnNames and tableName:
        indexName = tableName
        columnName = indexColumnNames[0]
        for x in indexColumnNames:
            indexName += "_" + x
            if x == columnName:
                continue
            columnName += "," + x
        return "CREATE INDEX %s ON %s (%s);" %(indexName, tableName, columnName)
    return ""


def write_create_tabel_sql():
    file = open(path, 'w')#创建sql文件，并开启写模式

if __name__ == "__main__":

    #处理编码方式为utf-8
    reload(sys)
    sys.setdefaultencoding('utf-8')

    #创建sql文件，并开启写模式
    file = open(sqlPath, 'w')

    b = FileFilt()
    b.FindFile(dirr = path)
    for filePath in b.fileList:
        create_table(filePath, file)

