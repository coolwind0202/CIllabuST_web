TMPDIR:=$(shell mktemp -d)
JSON_SCHEMA_URL='https://raw.githubusercontent.com/coolwind0202/CIllabuST_jsons/refs/heads/main/dist/syllabus.schema.json'

app/syllabus.d.ts: FORCE
	wget -P $(TMPDIR) $(JSON_SCHEMA_URL)
	npx json2ts $(TMPDIR)/syllabus.schema.json > app/syllabus.d.ts

FORCE:
