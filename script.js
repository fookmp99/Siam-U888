// ฟังก์ชันสำหรับแสดงราคาทันทีที่ผู้ใช้เลือกระยะเวลาในการยืม
document.getElementById('loan-time').addEventListener('change', function() {
    let loanTime = this.value; // ระยะเวลาในการยืมที่เลือก
    let price = calculatePrice(loanTime); // คำนวณราคา
    document.getElementById('price-display').innerHTML = 'ราคาค่าชั่วโมง: ' + price + ' บาท'; // แสดงราคา
});

// ฟังก์ชันคำนวณราคา
function calculatePrice(hours) {
    let price = 0;
    if (hours == 24) {
        price = 100;  // 24 ชั่วโมง = 100 บาท
    } else if (hours == 3) {
        price = 60;   // 3 ชั่วโมง = 60 บาท
    } else if (hours == 1) {
        price = 30;   // 1 ชั่วโมง = 30 บาท
    }
    return price;
}

// ฟังก์ชันเมื่อส่งฟอร์ม
document.getElementById('loan-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let studentName = document.getElementById('student-name').value;
    let studentId = document.getElementById('student-id').value;
    let loanTime = document.getElementById('loan-time').value;
    let comments = document.getElementById('comments').value;

    // ตรวจสอบรหัสนักศึกษาเป็นตัวเลข
    if (isNaN(studentId) || studentId.trim() === "") {
        alert("กรุณากรอกรหัสนักศึกษาเป็นตัวเลขเท่านั้น");
        return; // หยุดการส่งฟอร์ม
    }

    // แสดงข้อมูลในคอนโซล
    console.log('ข้อมูลการขอกู้ยืม:');
    console.log('ชื่อ-สกุล:', studentName);
    console.log('รหัสนักศึกษา:', studentId);
    console.log('ระยะเวลาในการยืม:', loanTime + ' ชั่วโมง');
    console.log('ความคิดเห็น:', comments);

    alert('ขอขอบคุณที่กรอกข้อมูล! ระบบจะดำเนินการต่อไป');

    // แปลงระยะเวลาในการยืมจากชั่วโมงเป็นวินาที
    let countdownValue = loanTime * 3600; // 1 ชั่วโมง = 3600 วินาที

    // เริ่มนับถอยหลัง
    let countdownDisplay = document.getElementById('countdown');
    countdownDisplay.innerHTML = 'กำลังดำเนินการ... ' + formatTime(countdownValue);

    let countdownInterval = setInterval(function() {
        countdownValue--;
        countdownDisplay.innerHTML = 'กำลังดำเนินการ... ' + formatTime(countdownValue);

        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.innerHTML = 'การดำเนินการเสร็จสิ้น!';
            document.getElementById('loan-form').reset(); // รีเซ็ตรูปแบบฟอร์ม
        }
    }, 1000);
});

// ฟังก์ชันสำหรับแปลงวินาทีเป็นรูปแบบ ชั่วโมง:นาที:วินาที
function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600); // คำนวณชั่วโมง
    let minutes = Math.floor((seconds % 3600) / 60); // คำนวณนาที
    let remainingSeconds = seconds % 60; // คำนวณวินาทีที่เหลือ

    return hours + ' ชั่วโมง ' + minutes + ' นาที ' + remainingSeconds + ' วินาที';
}
