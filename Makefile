TMPDIR:=$(shell mktemp -d)
JSON_SCHEMA_URL='https://raw.githubusercontent.com/coolwind0202/CIllabuST_jsons/refs/heads/main/dist/syllabus.schema.json'

app/syllabus.d.ts: FORCE
	wget -P $(TMPDIR) $(JSON_SCHEMA_URL)
	npx json-refs resolve $(TMPDIR)/syllabus.schema.json | npx json-schema-to-zod -o app/syllabus.ts -n Syllabus

FORCE:
