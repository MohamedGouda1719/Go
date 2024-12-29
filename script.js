const apiUrl = "http://<ESP32_IP>"; // استبدل بـ IP الخاص بالـ ESP32

// تحميل البيانات من ESP32
async function fetchData() {
    try {
        const response = await fetch(`${apiUrl}/get-data`);
        const data = await response.json();

        document.getElementById("minTemp").value = data.minTemp;
        document.getElementById("maxTemp").value = data.maxTemp;
        document.getElementById("minHumidity").value = data.minHumidity;
        document.getElementById("maxHumidity").value = data.maxHumidity;
        document.getElementById("wifiSSID").value = data.wifiSSID;
        document.getElementById("wifiMode").value = data.wifiMode;
    } catch (error) {
        alert("Error fetching data from ESP32.");
    }
}

// حفظ الإعدادات الجديدة
async function updateSettings() {
    const settings = {
        minTemp: document.getElementById("minTemp").value,
        maxTemp: document.getElementById("maxTemp").value,
        minHumidity: document.getElementById("minHumidity").value,
        maxHumidity: document.getElementById("maxHumidity").value,
        wifiSSID: document.getElementById("wifiSSID").value,
        wifiMode: document.getElementById("wifiMode").value,
    };

    try {
        const response = await fetch(`${apiUrl}/update-settings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings),
        });

        if (response.ok) {
            alert("Settings updated successfully!");
        } else {
            alert("Failed to update settings.");
        }
    } catch (error) {
        alert("Error updating settings.");
    }
}

// إعادة ضبط المصنع
async function resetFactory() {
    try {
        const response = await fetch(`${apiUrl}/reset-factory`);
        if (response.ok) {
            alert("Factory settings reset successfully!");
            fetchData(); // إعادة تحميل الإعدادات بعد إعادة الضبط
        } else {
            alert("Failed to reset factory settings.");
        }
    } catch (error) {
        alert("Error resetting factory settings.");
    }
}

// روابط الأزرار
document.getElementById("saveButton").addEventListener("click", updateSettings);
document.getElementById("resetButton").addEventListener("click", resetFactory);

// تحميل البيانات عند فتح الصفحة
window.onload = fetchData;
