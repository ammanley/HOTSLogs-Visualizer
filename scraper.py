import bs4
import requests
import csv
from re import sub

url = 'https://www.hotslogs.com/Default'
data = requests.get(url)
soup = bs4.BeautifulSoup(data.text, 'html.parser')

rows_odd = soup.find_all(class_='rgRow')
rows_even = soup.find_all(class_='rgAltRow')
rows = []

for i,val in enumerate(rows_odd):
	rows.append(val)
	rows.append(rows_even[i])

with open('hotslogs.csv','a') as hots:
	data_writer = csv.writer(hots, delimiter = ',')

# Will skip the icon and the trailing garbage
	for row in rows:
		row.row_values = []
		for i,val in enumerate(row):
			if i in [0,1,10]:
				continue
			row.row_values.append(sub(' %|,','',val.text).lstrip())
		data_writer.writerow(row.row_values)
