# coding=utf-8
import win32com
import traceback
import os


def doc2docx(srcPath, dstPath):
    word = win32com.client.gencache.EnsureDispatch("Word.Application")
    docCount = 0
    failedCount = 0
    for path, subdirs, files in os.walk(srcPath):
        for wordFile in files:
            wordFullName = os.path.join(path, wordFile)
            dotIndex = wordFile.rfind(".")
            if(dotIndex != -1):
                try:
                    fileSuffix = wordFile[(dotIndex + 1):]
                    if(fileSuffix == "doc"):
                        docxName = wordFile[:dotIndex] + ".docx"
                        docxFullName = os.path.join(dstPath, docxName)
                        print u'正在转化: %s' % wordFullName
                        doc = word.Documents.Open(wordFullName)
                        docCount += 1
                        doc.SaveAs(docxFullName, 12)
                        doc.Close()
                except Exception, e:
                    failedCount += 1
                    traceback.print_exc()
                    print docxFullName + u':该文件保存失败****************************************'
                    print e.printStack()
    word.Quit()
    print '尝试转换[%d]个doc，失败[%d]个' % (docCount, failedCount)
