import os
import re

files = ['currency.tsx', 'emi.tsx', 'gst.tsx', 'interest.tsx', 'age.tsx', 'split.tsx', 'unit.tsx', 'discount.tsx', 'bases.tsx', 'shapes.tsx']

for file in files:
    path = f'app/calculators/{file}'
    if not os.path.exists(path):
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        data = f.read()

    slug = file.replace('.tsx', '')

    # Map the hook assignment
    if "const { colors: GlobalColors } =" not in data:
        data = data.replace('const { colors: Colors } = useApp();', 
                            f'const {{ colors: GlobalColors }} = useApp();\n  const Colors = GlobalColors.themes.{slug};')
    
    # 1. Backgrounds
    data = re.sub(r'backgroundColor:\s*Colors\.background', 'backgroundColor: Colors.screenBg', data)
    data = re.sub(r'backgroundColor:\s*Colors\.cardBg', 'backgroundColor: Colors.displayBg', data)
    data = re.sub(r'backgroundColor:\s*Colors\.inputBg', 'backgroundColor: Colors.numBtn', data)
    
    # Header Accent -> opBtn instead of Global
    data = re.sub(r'accentColor=\{Colors\.accents\.[a-zA-Z]+\}', 'accentColor={Colors.opBtn}', data)

    # 2. Text Colors
    # Usually `color: Colors.text` -> `color: Colors.textColor`
    data = re.sub(r'color:\s*Colors\.text,', 'color: Colors.textColor,', data)
    data = re.sub(r'color:\s*Colors\.text\b', 'color: Colors.textColor', data)
    
    # Big Result Text -> displayText (Usually they are `styles.emiResult`, `styles.mainResult` etc)
    # They usually had `color: Colors.accents.[slug]` or `color: Colors.text`
    # Let's just find specific big fonts and replace them
    data = re.sub(r'fontSize:\s*48,(\s*)fontFamily:\s*\'DMSans_700Bold\',(\s*)marginBottom:\s*20,', 
                  r'color: Colors.displayText,\n    fontSize: 48,\1fontFamily: \'Nunito_900Black\',\2marginBottom: 20,', data)
    data = re.sub(r'fontSize:\s*42,(\s*)fontWeight:\s*\'bold\',(\s*)marginBottom:\s*20,', 
                  r'color: Colors.displayText,\n    fontSize: 48,\1fontFamily: \'Nunito_900Black\',\2marginBottom: 20,', data)
    data = re.sub(r"color:\s*Colors\.accents\.[a-zA-Z]+", "color: Colors.opBtn", data)
    
    # Re-map fonts
    data = re.sub(r"fontFamily:\s*'DMSans_700Bold'", "fontFamily: 'Nunito_700Bold'", data)
    data = re.sub(r"fontFamily:\s*'DMSans_500Medium'", "fontFamily: 'Nunito_500Medium'", data)
    data = re.sub(r"fontFamily:\s*'DMSans_400Regular'", "fontFamily: 'Nunito_400Regular'", data)
    data = re.sub(r"fontWeight:\s*'bold'", "fontFamily: 'Nunito_700Bold'", data)
    data = re.sub(r"fontWeight:\s*'500'", "fontFamily: 'Nunito_500Medium'", data)
    data = re.sub(r"fontWeight:\s*'300'", "fontFamily: 'Nunito_400Regular'", data)

    # Borders
    data = re.sub(r'borderColor:\s*Colors\.border', "borderColor: 'rgba(0,0,0,0.05)'", data)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(data)

print("Batch style update standard complete!")
