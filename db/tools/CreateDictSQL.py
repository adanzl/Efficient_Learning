# coding=utf-8
import docx
import os
import re
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

DOC_PATH = os.path.split(os.path.realpath(__file__))[0] + u"\\词库"
PATTERN = [' ', '.', '“', '”', ',', '_', '!', ':', '–', '?', '-', '    ', ' ', '\n', '＂', '．', '(']
OUT_FILE_NAME = '../dictData.sql'
EXCLUDE_PATTERN = r"[\d\x80-\xff]+"
SQL_TEMPLATE = 'INSERT INTO exam_dict ("word", "mean", "sentence", "add_time") VALUES ("%s", "%s", "%s", datetime());\n'
zhPattern = re.compile(u'[\u2e80-\u9fff]+')
azPattern = re.compile(u'[\u0041-\u005a\u0061-\u007a]+')
SENTENCE_MARK = ['(', ')', '（', '）']
f_out_file = open(OUT_FILE_NAME, 'w')


def is_chinese(uni_ch):   # 判断一个 unicode 是否是汉字。
    if zhPattern.search(uni_ch):
        return True
    else:
        return False


def is_alphabet(uchar):  # 判断一个unicode是否是英文字母
    if azPattern.search(uchar):
        return True
    else:
        return False


def is_sentence(uni_ch):
    return is_chinese(uni_ch) or uni_ch in SENTENCE_MARK


def handleFile(fileName, result):
    print "Handle File [%s]" % (fileName)
    document = docx.Document(fileName)
    for paragraph in document.paragraphs:
        docText = fixWord(paragraph.text.encode('utf-8'))
        if docText.strip() == '' or docText.strip().isupper():
            continue

        data = docText.split('  ')
        word = data[0].strip()
        mean = data[1].strip()
        if len(data) > 2:
            sentence = data[2].strip()
        else:
            sentence = ''
        f_out_file.write(SQL_TEMPLATE % (word, mean, sentence))


def fixWord(dataText):
    dataText = re.sub('[\s]{2,}', '  ', dataText)  # 删除多余空格
    dataText = dataText.replace("：", "  ")
    dataText = dataText.replace(":", "  ")
    dataText = dataText.replace(", ", "  ")
    outStr = ""
    preCh = ""
    # 中英文切换后加入空格
    for i, ch in enumerate(dataText.decode('utf-8')):

        if (is_sentence(preCh) and is_alphabet(ch)) or (is_alphabet(preCh) and is_sentence(ch)):
            # print ("%s %s %s %s") % (preCh, ch, is_sentence(preCh), is_alphabet(ch))
            outStr += '  '
        elif (preCh == ' ' and is_sentence(ch) or (is_sentence(preCh) and ch == ' ')):
            outStr += ' '
        outStr += ch
        preCh = ch
    return outStr


resultDict = {}
for path, subdirs, files in os.walk(DOC_PATH):
    for wordFile in files:
            wordFullName = os.path.join(path, wordFile)
            dotIndex = wordFile.rfind(".")
            if(dotIndex != -1):
                fileSuffix = wordFile[(dotIndex + 1):]
                if(fileSuffix == "docx"):
                    handleFile(wordFullName, resultDict)
f_out_file.close()
# sortedDisplayDic(resultDict)
# doc2docx(DOC_PATH, DOC_PATH)
# print fixWord("lean 斜，倾斜              the Leaning tower of Pisa".decode("utf-8"))
# print re.compile(u'[\u4e00-\u9fa5]+').search("斜".decode('utf-8'))
# print is_alphabet(u"a")
