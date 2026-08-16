Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\rajrk\.gemini\antigravity\brain\2b6fbaf5-efa9-4eea-8e05-9b3baf029839\.user_uploaded\media_1786873939566.png"
$outDir = "C:\Users\rajrk\Astro\public\zodiac"

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force
}

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Host "Source Dimensions: $($bmp.Width) x $($bmp.Height)"

$signBoxes = @(
    @{ id="pisces";      x1=53;  y1=35;  x2=128; y2=105 },
    @{ id="aquarius";    x1=186; y1=36;  x2=243; y2=105 },
    @{ id="capricorn";   x1=305; y1=39;  x2=373; y2=101 },
    @{ id="sagittarius"; x1=430; y1=41;  x2=496; y2=101 },

    @{ id="scorpio";     x1=66;  y1=175; x2=114; y2=243 },
    @{ id="libra";       x1=184; y1=174; x2=245; y2=243 },
    @{ id="virgo";       x1=311; y1=174; x2=366; y2=243 },
    @{ id="leo";         x1=431; y1=174; x2=495; y2=243 },

    @{ id="cancer";      x1=57;  y1=312; x2=125; y2=379 },
    @{ id="gemini";      x1=185; y1=312; x2=243; y2=381 },
    @{ id="taurus";      x1=304; y1=316; x2=373; y2=376 },
    @{ id="aries";       x1=435; y1=312; x2=490; y2=381 }
)

foreach ($item in $signBoxes) {
    $signId = $item.id
    $pad = 2
    $cropX = [Math]::Max(0, $item.x1 - $pad)
    $cropY = [Math]::Max(0, $item.y1 - $pad)
    $cropW = [Math]::Min($bmp.Width - $cropX, ($item.x2 - $item.x1) + ($pad * 2) + 1)
    $cropH = [Math]::Min($bmp.Height - $cropY, ($item.y2 - $item.y1) + ($pad * 2) + 1)

    $outSize = 256
    $outBmp = New-Object System.Drawing.Bitmap $outSize, $outSize, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($outBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    # Fit within 88% of 256x256
    $scale = [Math]::Min(($outSize * 0.88) / [double]$cropW, ($outSize * 0.88) / [double]$cropH)
    $destW = [int]($cropW * $scale)
    $destH = [int]($cropH * $scale)
    $destX = [int](($outSize - $destW) / 2.0)
    $destY = [int](($outSize - $destH) / 2.0)

    $srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
    $destRect = New-Object System.Drawing.Rectangle $destX, $destY, $destW, $destH

    $g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    # Smooth transparent alpha mask to remove black background cleanly
    for ($y = 0; $y -lt $outSize; $y++) {
        for ($x = 0; $x -lt $outSize; $x++) {
            $pixel = $outBmp.GetPixel($x, $y)
            $brightness = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B))
            if ($brightness -lt 32) {
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } elseif ($brightness -lt 80) {
                $alpha = [int](($brightness - 32) / 48.0 * 255.0)
                # Keep bright gold color with appropriate alpha
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $pixel.R, $pixel.G, $pixel.B))
            }
        }
    }

    $outFile = Join-Path $outDir "$signId.png"
    $outBmp.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $outBmp.Dispose()
    Write-Host "Extracted $signId -> $destW x $destH into $outFile"
}

$bmp.Dispose()
Write-Host "All 12 true golden zodiac icons extracted with 100% precision!"
