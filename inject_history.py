import os
import re

calc_dir = r"app/calculators"
files = [f for f in os.listdir(calc_dir) if f.endswith('.tsx')]

for file in files:
    tool_id = file.split('.')[0]
    filepath = os.path.join(calc_dir, file)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add imports
    if 'import HistoryModal' not in content:
        import_stmt = (
            "import { saveHistory } from '../../utils/history';\n"
            "import HistoryModal from '../../components/HistoryModal';\n"
            "import { scheduleSmartNotification } from '../../utils/notifications';\n"
        )
        content = content.replace("import Header from '../../components/Header';", import_stmt + "import Header from '../../components/Header';")

    # Add state hook right after component declaration
    # Finds: export default function Something() {
    #        const { colors: Colors } = useApp();
    if 'const [historyVisible, setHistoryVisible] = useState(false);' not in content:
        match = re.search(r'(export default function \w+\([^)]*\)\s*\{)', content)
        if match:
             insertion = "\n  const [historyVisible, setHistoryVisible] = useState(false);\n"
             content = content[:match.end()] + insertion + content[match.end():]

    # Update Header
    header_pattern = r'(<Header\s+title="[^"]+"\s+accentColor=\{[^}]+\})'
    if 'onHistoryPress' not in content:
         content = re.sub(header_pattern, r'\1 onHistoryPress={() => setHistoryVisible(true)}', content)
         
    # Inject HistoryModal right below Header
    # <Header ... />
    if '<HistoryModal' not in content:
         header_close_pattern = r'(<Header[^>]+/>)'
         modal_code = f'\n      <HistoryModal visible={{historyVisible}} toolId="{tool_id}" onClose={{() => setHistoryVisible(false)}} />'
         content = re.sub(header_close_pattern, r'\1' + modal_code, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Injected into {file}")
