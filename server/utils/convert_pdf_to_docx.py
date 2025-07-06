from pdf2docx import Converter
import sys

input_pdf = sys.argv[1]
output_docx = sys.argv[2]
print(f"Converting {input_pdf} → {output_docx}")

cv = Converter(input_pdf)
cv.convert(output_docx)
cv.close()
print("Conversion done")
