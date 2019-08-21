import re;
import json;
import datetime
from datetime import date

logs = open('sample.log');

def returnRoute(text):
    matches = re.findall(r'\"(.+?)\"',text);
    return ",".join(matches)

count = 0;
data = {};
data["master"] = [];

datePattern = r'\d{4}-\d{2}-\d{2}';
timePattern = r'\b(2[0-3]|[01][0-9]):[0-5][0-9]\b';
uuIdPattern = r'.*?\[(.*)].*';
ipAddressPattern = r'\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b';


for line in logs.readlines():
    table = {};
    count += 1;
    l = line.strip();
    uuid = re.search(uuIdPattern, l);
    table["uuid"] = uuid.group(1);
    table["lineNumber"] = count;

    stripped  = l[39:];

    ip = re.search(ipAddressPattern, stripped);

    if ip is not None:

        dt = re.search(datePattern, stripped);
        tm = re.search(timePattern, stripped);

        date = dt.group()
        time = tm.group()

        table["date"] = date;
        table["time"] = time;
        table["ipAddress"] = ip.group(0);
        table["urlRoute"] = returnRoute(stripped);
    else:
        table["ipAddress"] = "none";
        table["urlRoute"] = "none";

    if 'GET' in stripped:
        table["method"] = "get"

    elif 'POST' in stripped:
        table["method"] = "post"

    elif 'PUT' in stripped:
        table["method"] = "put"

    elif 'DELETE' in stripped:
        table["method"] = "delete"

    elif 'Rendered' in stripped:
        table["method"] = "rendered"

    elif 'Completed' in stripped:
        table["method"] = "completed"

    else:
        table["method"] = "undefined"
        table["ipAddress"] = "process"

    table["text"] = stripped;

    data["master"].append(table)


with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
