Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\rajrk\.gemini\antigravity\brain\2b6fbaf5-efa9-4eea-8e05-9b3baf029839\.user_uploaded\media_1786863716602.png"
$outDir = "C:\Users\rajrk\Astro\public\zodiac"

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force
}

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Host "Source Dimensions: $($bmp.Width) x $($bmp.Height)"

# Precise cell coordinates for the 12 icons:
# Row 0: Pisces (Col 0), Aquarius (Col 1), Capricorn (Col 2), Sagittarius (Col 3)
# Row 1: Scorpio (Col 0), Libra (Col 1), Virgo (Col 2), Leo (Col 3)
# Row 2: Cancer (Col 0), Gemini (Col 1), Taurus (Col 2), Aries (Col 3)

$signGrid = @(
    @{ id="pisces";      x1=15;  y1=10;  x2=175; y2=100 },
    @{ id="aquarius";    x1=200; y1=10;  x2=360; y2=100 },
    @{ id="capricorn";   x1=380; y1=10;  x2=545; y2=100 },
    @{ id="sagittarius"; x1=565; y1=10;  x2=730; y2=100 },

    @{ id="scorpio";     x1=15;  y1=140; x2=175; y2=230 },
    @{ id="libra";       x1=200; y1=140; x2=360; y2=230 },
    @{ id="virgo";       x1=380; y1=140; x2=545; y2=230 },
    @{ id="leo";         x1=565; y1=140; x2=730; y2=230 },

    @{ id="cancer";      x1=15;  y1=270; x2=175; y2=360 },
    @{ id="gemini";      x1=200; y1=270; x2=360; y2=360 },
    @{ id="taurus";      x1=380; y1=270; x2=545; y2=360 },
    @{ id="aries";       x1=565; y1=270; x2=730; y2=360 }
)

foreach ($item in $signGrid) {
    $signId = $item.id
    $x1 = $item.x1
    $y1 = $item.y1
    $x2 = $item.x2
    $y2 = $item.y2

    # Find tight bounding box of gold pixels inside region
    $minX = $x2
    $minY = $y2
    $maxX = $x1
    $maxY = $y1

    for ($y = $y1; $y -le $y2; $y++) {
        for ($x = $x1; $x -le $x2; $x++) {
            if ($x -lt $bmp.Width -and $y -lt $bmp.Height) {
                $p = $bmp.GetPixel($x, $y)
                # Check brightness for golden color
                $val = [Math]::Max($p.R, [Math]::Max($p.G, $p.B))
                if ($val -gt 40) {
                    if ($x -lt $minX) { $minX = $x }
                    if ($x -gt $maxX) { $maxX = $x }
                    if ($y -lt $minY) { $minY = $y }
                    if ($y -gt $maxY) { $maxY = $y }
                }
            }
        }
    }

    $pad = 3
    $cropX = [Math]::Max(0, $minX - $pad)
    $cropY = [Math]::Max(0, $minY - $pad)
    $cropW = [Math]::Min($bmp.Width - $cropX, ($maxX - $minX) + ($pad * 2))
    $cropH = [Math]::Min($bmp.Height - $cropY, ($maxY - $minY) + ($pad * 2))

    $outSize = 180
    $outBmp = New-Object System.Drawing.Bitmap $outSize, $outSize, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($outBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $scale = [Math]::Min(($outSize * 0.90) / [double]$cropW, ($outSize * 0.90) / [double]$cropH)
    $destW = [int]($cropW * $scale)
    $destH = [int]($cropH * $scale)
    $destX = [int](($outSize - $destW) / 2.0)
    $destY = [int](($outSize - $destH) / 2.0)

    $srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
    $destRect = New-Object System.Drawing.Rectangle $destX, $destY, $destW, $destH

    $g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    # Clean background to transparent and ensure radiant golden colors
    for ($y = 0; $y -lt $outSize; $y++) {
        for ($x = 0; $x -lt $outSize; $x++) {
            $pixel = $outBmp.GetPixel($x, $y)
            $brightness = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B))
            if ($brightness -lt 35) {
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } elseif ($brightness -lt 85) {
                $alpha = [int](($brightness - 35) / 50.0 * 255.0)
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $pixel.R, $pixel.G, $pixel.B))
            }
        }
    }

    $outFile = Join-Path $outDir "$signId.png"
    $outBmp.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $outBmp.Dispose()
    Write-Host "Processed $signId -> Bounds: ($cropX, $cropY, $cropW, $cropH)"
}

$bmp.Dispose()
Write-Host "All 12 icons cropped with pixel-perfection!"
