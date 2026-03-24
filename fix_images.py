import os
from PIL import Image

# 1. Fix icon.png (metadata strip)
icon_paths = [
    r"C:\Users\Admin\Desktop\OneCalc\assets\images\icon.png",
    r"C:\Users\Admin\Desktop\OneCalc\assets\images\adaptive-icon.png",
    r"C:\Users\Admin\Desktop\OneCalc\assets\images\splash-icon.png",
    r"C:\Users\Admin\Desktop\OneCalc\assets\images\android-icon-foreground.png"
]

print("Staring icon fixes...")
for p in icon_paths:
    if os.path.exists(p):
        print(f"Fixing {p}...")
        img = Image.open(p)
        # Re-save as PNG strips metadata (EXIF/Text chunks)
        img.save(p, "PNG")
        print("Fixed.")
    else:
        print(f"Skipping {p} (Not found)")

# 2. Create onecalcwidget_preview.png (Navy #0A1F44 320x160)
# We place it in both drawable and assets targets to ensure absolute safety fit
widget_paths = [
    r"C:\Users\Admin\Desktop\OneCalc\android\app\src\main\res\drawable\onecalcwidget_preview.png",
    r"C:\Users\Admin\Desktop\OneCalc\assets\images\onecalcwidget_preview.png"
]

img_widget = Image.new('RGB', (320, 160), color='#0A1F44')
print("\nStarting widget preview creation...")
for wp in widget_paths:
    try:
        os.makedirs(os.path.dirname(wp), exist_ok=True)
        img_widget.save(wp, "PNG")
        print(f"Created/Overwritten {wp}")
    except Exception as e:
        print(f"Error creating {wp}: {e}")

print("\nAll tasks completed.")
