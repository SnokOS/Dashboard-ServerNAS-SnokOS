document.addEventListener('DOMContentLoaded', function () {
    // Lucide Icons initialization
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const API_BASE = '/api';

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('snok-theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-layout');
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        function updateChartsTheme() {
            if (typeof ApexCharts === 'undefined') return;
            const isLight = document.body.classList.contains('light-layout');
            const theme = isLight ? 'light' : 'dark';

            document.querySelectorAll('.apexcharts-canvas').forEach(el => {
                const chartId = el.closest('[id]').id;
                if (chartId) {
                    ApexCharts.exec(chartId, 'updateOptions', {
                        theme: { mode: theme }
                    });
                }
            });
        }

        updateThemeIcon();

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-layout');
            const isLight = document.body.classList.contains('light-layout');
            document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
            localStorage.setItem('snok-theme', isLight ? 'light' : 'dark');
            updateThemeIcon();
            updateChartsTheme();
        });
    }

    function updateThemeIcon() {
        if (!themeToggle) return;
        const isLight = document.body.classList.contains('light-layout');
        const iconName = isLight ? 'sun' : 'moon';
        themeToggle.innerHTML = `<i data-lucide="${iconName}" class="icon-sm"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // --- Language Switching Logic ---
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangText = document.getElementById('currentLang');

    const translations = {
        en: {
            dashboard: "Dashboard", apps: "Apps", files: "Files", storage: "Storage",
            sharing: "Sharing", network: "Network", settings: "Settings",
            reboot: "Reboot System", shutdown: "Shutdown System",
            save_changes: "Save Changes", saving: "Saving...", saved: "Settings Saved",
            system_settings: "System Settings", general: "General", users: "Users",
            security: "Security", ddns: "DDNS", updates: "Updates", info: "Info Server", about: "About",
            total_storage: "Total Storage", bandwidth: "Bandwidth", cpu_usage: "CPU Usage",
            memory: "Memory", uptime: "Uptime", temperature: "Temperature",
            healthy: "Healthy", warning: "Warning", critical: "Critical", online: "Online",
            services: "Services", recent_activity: "Recent Activity", storage_health: "Storage Health",
            system_perf: "System Performance", confirmation: "Are you sure?", cancel: "Cancel", confirm: "Confirm",
            disk: "Disk", status: "Status", capacity: "Capacity", action: "Action",
            usage: "Usage", processing: "Processing...", action_completed: "Action initiated!"
        },
        fr: {
            dashboard: "Tableau de Bord", apps: "Applications", files: "Fichiers", storage: "Stockage",
            sharing: "Partage", network: "Réseau", settings: "Paramètres",
            reboot: "Redémarrer", shutdown: "Éteindre",
            save_changes: "Enregistrer", saving: "Enregistrement...", saved: "Paramètres Enregistrés",
            system_settings: "Paramètres Système", general: "Général", users: "Utilisateurs",
            security: "Sécurité", ddns: "DDNS", updates: "Mises à jour", info: "Serveur d'info", about: "À propos",
            total_storage: "Stockage Total", bandwidth: "Bande passante", cpu_usage: "Utilisation CPU",
            memory: "Mémoire", uptime: "Temps de fonctionnement", temperature: "Température",
            healthy: "Sain", warning: "Avertissement", critical: "Critique", online: "En ligne",
            services: "Services", recent_activity: "Activité Récente", storage_health: "Santé du Stockage",
            system_perf: "Performance du Système", confirmation: "Êtes-vous sûr ?", cancel: "Annuler", confirm: "Confirmer",
            disk: "Disque", status: "Statut", capacity: "Capacité", action: "Action",
            usage: "Utilisation", processing: "Traitement...", action_completed: "Action initiée!"
        },
        ar: {
            dashboard: "لوحة التحكم", apps: "التطبيقات", files: "الملفات", storage: "التخزين",
            sharing: "المشاركة", network: "الشبكة", settings: "الإعدادات",
            reboot: "إعادة التشغيل", shutdown: "إيقاف التشغيل",
            save_changes: "حفظ التغييرات", saving: "جاري الحفظ...", saved: "تم حفظ الإعدادات",
            system_settings: "إعدادات النظام", general: "عام", users: "المستخدمين",
            security: "الأمان", ddns: "DDNS", updates: "التحديثات", info: "معلومات السيرفر", about: "حول",
            total_storage: "إجمالي التخزين", bandwidth: "عرض النطاق الترددي", cpu_usage: "استخدام المعالج",
            memory: "الذاكرة", uptime: "وقت التشغيل", temperature: "درجة الحرارة",
            healthy: "سليم", warning: "تحذير", critical: "حرج", online: "متصل",
            services: "الخدمات", recent_activity: "النشاط الأخير", storage_health: "صحة التخزين",
            system_perf: "أداء النظام", confirmation: "هل أنت متأكد؟", cancel: "إلغاء", confirm: "تأكيد",
            disk: "القرص", status: "الحالة", capacity: "السعة", action: "الإجراء",
            usage: "الاستخدام", processing: "جاري المعالجة...", action_completed: "تم تنفيذ الإجراء!"
        }
    };

    if (langOptions.length > 0) {
        const savedLang = localStorage.getItem('snok-lang') || 'en';
        applyLanguage(savedLang);

        langOptions.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = opt.getAttribute('data-lang');
                applyLanguage(lang);
            });
        });
    }

    function applyLanguage(lang) {
        localStorage.setItem('snok-lang', lang);
        if (currentLangText) currentLangText.textContent = lang.toUpperCase();

        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.body.classList.add('rtl-active');
        } else {
            document.documentElement.removeAttribute('dir');
            document.body.classList.remove('rtl-active');
        }
    }

    // --- System Stats Real-time Updates ---
    function fetchStats() {
        fetch(`${API_BASE}/stats`)
            .then(res => res.json())
            .then(data => {
                updateStatUI('cpu_usage', data.cpu_usage + '%');
                updateStatUI('memory', `${(data.memory.used / (1024 ** 3)).toFixed(1)}GB / ${(data.memory.total / (1024 ** 3)).toFixed(1)}GB`);
                updateStatUI('temperature', data.temp + '°C');
                updateStatUI('uptime', data.uptime);

                // Update progress bars
                const cpuBar = document.querySelector('[data-t="cpu_usage"]').closest('.card').querySelector('.progress-bar');
                if (cpuBar) cpuBar.style.width = data.cpu_usage + '%';

                const memBar = document.querySelector('[data-t="memory"]').closest('.card').querySelector('.progress-bar');
                if (memBar) memBar.style.width = data.memory.percent + '%';
            })
            .catch(err => console.error("Error fetching stats:", err));
    }

    function updateStatUI(tKey, value) {
        const el = document.querySelector(`[data-t="${tKey}"]`);
        if (el) {
            const valEl = el.nextElementSibling;
            if (valEl) valEl.textContent = value;
        }
    }

    if (document.querySelector('[data-t="cpu_usage"]')) {
        setInterval(fetchStats, 3000);
        fetchStats();
    }

    // --- Storage & Rack Visualization ---
    function fetchStorage() {
        fetch(`${API_BASE}/storage`)
            .then(res => res.json())
            .then(disks => {
                const rack = document.querySelector('.bay-row') || document.querySelector('.drive-bays');
                if (rack) {
                    rack.innerHTML = '';
                    disks.forEach(disk => {
                        const bay = document.createElement('div');
                        bay.className = `bay-large ${disk.state === 'empty' ? 'empty' : 'healthy pulse'}`;
                        bay.title = disk.id ? `Disk: /dev/${disk.id} (${disk.model})` : "Empty Bay";
                        bay.innerHTML = disk.state !== 'empty' ? '<div class="bay-handle"></div><div class="bay-led"></div>' : '<div class="bay-handle"></div>';
                        rack.appendChild(bay);
                    });
                }

                // Update table if on storage page
                const tableBody = document.querySelector('table tbody');
                if (tableBody && window.location.pathname.includes('storage.html')) {
                    tableBody.innerHTML = '';
                    disks.filter(d => d.id).forEach(disk => {
                        const row = document.createElement('tr');
                        row.className = 'border-top border-white-5 pointer disk-row';
                        row.innerHTML = `
                            <td class="fw-bold">${disk.id} (${disk.model})</td>
                            <td>${disk.size}</td>
                            <td><span class="badge bg-success-soft text-success">${disk.temp}</span></td>
                            <td>${disk.health}</td>
                            <td><span class="status-indicator online"></span> ONLINE</td>
                        `;
                        tableBody.appendChild(row);
                    });
                }
            })
            .catch(err => console.error("Error fetching storage:", err));
    }

    if (document.querySelector('.rack-visualization') || document.querySelector('.drive-bays')) {
        fetchStorage();
    }

    // --- One-Click App Install ---
    window.installApp = function (appId) {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Installing...`;

        fetch(`${API_BASE}/apps/install`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: appId })
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                btn.innerHTML = `<i data-lucide="check" class="me-2 icon-sm"></i> Installed`;
                btn.className = 'btn btn-success rounded-pill btn-sm w-100';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            })
            .catch(err => {
                console.error("Installation error:", err);
                btn.disabled = false;
                btn.textContent = originalText;
            });
    };

    // --- Power Actions Logic ---
    const confirmPowerBtn = document.getElementById('confirmPower');
    if (confirmPowerBtn) {
        confirmPowerBtn.addEventListener('click', function () {
            const action = document.getElementById('powerModalTitle').textContent.toLowerCase().includes('reboot') ? 'reboot' : 'shutdown';
            fetch(`${API_BASE}/power`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: action })
            })
                .then(() => {
                    alert("Action initiated. The system will " + action + " shortly.");
                    window.location.reload();
                });
        });
    }
});
