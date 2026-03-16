(function() {
    var uploadZone = document.getElementById('imgratioUploadZone');
    var browseBtn = document.getElementById('imgratioBrowseBtn');
    var fileInput = document.getElementById('imgratioFileInput');
    var widthInput = document.getElementById('imgratioWidth');
    var heightInput = document.getElementById('imgratioHeight');
    var calcBtn = document.getElementById('imgratioCalcBtn');
    var resultSection = document.getElementById('imgratioResult');
    var ratioEl = document.getElementById('imgratioRatio');
    var decimalEl = document.getElementById('imgratioDecimal');
    var dimsEl = document.getElementById('imgratioDims');
    var newWidthInput = document.getElementById('imgratioNewWidth');
    var newHeightInput = document.getElementById('imgratioNewHeight');
    var ratioPresets = document.querySelectorAll('.ratio-preset-btn');

    var currentW = 0;
    var currentH = 0;

    function gcd(a, b) {
        a = Math.abs(Math.round(a));
        b = Math.abs(Math.round(b));
        while (b) { var t = b; b = a % b; a = t; }
        return a;
    }

    function simplifyRatio(w, h) {
        if (!w || !h) return '-';
        var d = gcd(w, h);
        return Math.round(w / d) + ':' + Math.round(h / d);
    }

    function showResult(w, h) {
        currentW = w;
        currentH = h;
        if (!w || !h) return;
        ratioEl.textContent = simplifyRatio(w, h);
        decimalEl.textContent = (w / h).toFixed(4);
        dimsEl.textContent = w + ' x ' + h;
        resultSection.style.display = 'flex';
        newWidthInput.value = '';
        newHeightInput.value = '';
        ratioPresets.forEach(function(btn) { btn.classList.remove('active'); });
    }

    function loadImage(file) {
        if (!file || !file.type.startsWith('image/')) return;
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.onload = function() {
            widthInput.value = img.naturalWidth;
            heightInput.value = img.naturalHeight;
            showResult(img.naturalWidth, img.naturalHeight);
            URL.revokeObjectURL(url);
        };
        img.onerror = function() { URL.revokeObjectURL(url); };
        img.src = url;
    }

    if (browseBtn) browseBtn.addEventListener('click', function(e) { e.stopPropagation(); fileInput.click(); });
    if (fileInput) fileInput.addEventListener('change', function() { if (fileInput.files.length) loadImage(fileInput.files[0]); });

    if (uploadZone) {
        uploadZone.addEventListener('click', function() { fileInput.click(); });
        uploadZone.addEventListener('dragover', function(e) { e.preventDefault(); uploadZone.classList.add('drag-over'); });
        uploadZone.addEventListener('dragleave', function() { uploadZone.classList.remove('drag-over'); });
        uploadZone.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadZone.classList.remove('drag-over');
            if (e.dataTransfer.files.length) loadImage(e.dataTransfer.files[0]);
        });
    }

    if (calcBtn) {
        calcBtn.addEventListener('click', function() {
            var w = parseInt(widthInput.value);
            var h = parseInt(heightInput.value);
            if (w > 0 && h > 0) showResult(w, h);
        });
    }

    if (widthInput && heightInput) {
        function onDimKeydown(e) {
            if (e.key === 'Enter') {
                var w = parseInt(widthInput.value);
                var h = parseInt(heightInput.value);
                if (w > 0 && h > 0) showResult(w, h);
            }
        }
        widthInput.addEventListener('keydown', onDimKeydown);
        heightInput.addEventListener('keydown', onDimKeydown);
    }

    if (newWidthInput) {
        newWidthInput.addEventListener('input', function() {
            if (!currentW || !currentH) return;
            var nw = parseInt(newWidthInput.value);
            if (nw > 0) {
                newHeightInput.value = Math.round(nw * currentH / currentW);
            }
        });
    }

    if (newHeightInput) {
        newHeightInput.addEventListener('input', function() {
            if (!currentW || !currentH) return;
            var nh = parseInt(newHeightInput.value);
            if (nh > 0) {
                newWidthInput.value = Math.round(nh * currentW / currentH);
            }
        });
    }

    ratioPresets.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var w = parseInt(btn.getAttribute('data-w'));
            var h = parseInt(btn.getAttribute('data-h'));
            ratioPresets.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            widthInput.value = w;
            heightInput.value = h;
            showResult(w, h);
        });
    });
})();
