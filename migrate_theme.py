import os
import re

def migrate_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'import { Colors }' not in content and 'Colors.' not in content:
        return

    # 1. Update import
    parts = filepath.split(os.sep)
    depth = 0
    if 'app' in parts:
        depth = len(parts) - parts.index('app') - 1
    elif 'components' in parts:
        depth = len(parts) - parts.index('components') - 1
    prefix = './' if depth == 0 else '../' * depth
    content = re.sub(r"import \{ Colors \} from '[^']+';", f"import {{ useApp }} from '{prefix}context/AppContext';", content)

    # 2. Wrap StyleSheet.create
    if 'const styles = StyleSheet.create' in content:
        content = content.replace('const styles = StyleSheet.create', 'const getStyles = (Colors: any) => StyleSheet.create')

    # 3. Inject hook
    match = re.search(r'(export default function \w+\([^)]*\)\s*\{)', content)
    if not match:
        match = re.search(r'(const \w+ = \([^)]*\)\s*=>\s*\{)', content)
    
    if match:
        insertion = "\n  const { colors: Colors } = useApp();\n"
        if 'getStyles' in content:
            insertion += "  const styles = getStyles(Colors);\n"
        content = content[:match.end()] + insertion + content[match.end():]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Migrated {filepath}")

for root_dir in ['app', 'components']:
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                if file == '_layout.tsx': continue
                migrate_file(os.path.join(root, file))
