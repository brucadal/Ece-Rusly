// Fungsi untuk meminta nama pengguna melalui prompt dan menampilkannya
function tampilkanNama() {
    // Meminta input nama melalui prompt
    
  
    const nama = prompt("Masukkan nama Anda:");

    // Menampilkan nama yang dimasukkan di elemen dengan id 'nama-sambutan'
    if (nama) {
        document.getElementById('nama-sambutan').textContent = nama;
    } else {
        document.getElementById('nama-sambutan').textContent = "Tamu yang terhormat";
    }
    document.getElementById("loading-screen").style.display = "none";
            document.getElementById("main-content").style.display = "block";
            window.onload = () => {
                tampilkanNama();
            };
}

// Panggil fungsi untuk meminta nama saat halaman dimuat atau sesuai kebutuhan
window.onload = function() {
    tampilkanNama();
};


// aos
AOS.init()

// Hapus scroll horizontal jika ada
function preventHorizontalScroll() {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
}

// Jalankan fungsi saat halaman dimuat
preventHorizontalScroll();

// music
// var tempMusic = ''
// music = document.querySelector('.music')
// if (tempMusic) {
//     music.src = tempMusic
// }
// music.play()

var music = document.querySelector('.music');
if (music) {
    music.play().catch(function(error) {
        console.error("Error playing music:", error);
    });
} else {
    console.error("Music element not found.");
}
// door mulai
function mulai() {
    // back to top
    window.scrollTo(0, 0)

    // sound door
    var soundDoor = document.querySelector('.sound-door')
    soundDoor.play()

    // door section
    var doorSection = $('#door-section')
    var doors =  document.querySelectorAll('.door')
    doors.forEach(function (door, index) {
        var direction = (index === 0) ? -1 : 1;
        door.style.transform = 'rotateY(' + (70 * direction) + 'deg)';
    });


// set timeout music
setTimeout(function(){
    // music play
    music.play()
    doorSection.css('transform', 'scale(6)')
}, 600)

// set timeout door section

setTimeout(function(){
    doorSection.css('opacity', 0)
    $('body').removeClass('overflow-hidden')
    $('body').addClass('transition')
    doorSection.css('display', 'none')
}, 2000)
}

var isPlaying = true

function toggleMusic(event) {
    event.preventDefault()

    const musicButton = document.getElementById('music-button')

    if (isPlaying) {
        musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>'
        musicButton.classList.remove('rotate')
        musicButton.style.transform = 'translateY(0)'
        music.pause();
    } else {
        musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>'
        musicButton.classList.add('rotate')
        music.play()
    }

    isPlaying = !isPlaying
}

// countdown wedding
var countdownDate = new Date("December 16,2024 10:00:00").getTime()

var x = setInterval(function() {
    var now = new Date().getTime()

    var distance = countdownDate - now

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById ('countdown-wedding').innerHTML = `
              <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${days}</h5> Hari</div></div>
          <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${hours}</h5> Jam</div></div>
          <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${minutes}</h5> Menit</div></div>
          <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${seconds}</h5> Detik</div></div>
          `

          if (distance < 0) {
            clearInterval(x)
            document.getElementById('countdown-wedding').innerHTML = "<span class='text-center p-3 rounded text-light m-2'><h2>Sudah dimulai!</h2></span>"
          }
}, 1000)

// nama sambutan
const urlParans = new URLSearchParams(window.location.search)
const panggilan = urlParans.get('p')
const nama = urlParans.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')
namaSambutan.innerText = `${panggilan} ${nama}`
// copy trxt

function copyText(el)
{
    var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim()
    var temp = document.createElement('textarea');
    document.body.appendChild(temp)

    temp.value = content.replace(/\s+/g, '')
    temp.select()

    document.execCommand ("copy")

    document.body.removeChild(temp)

    jQuery(el).text('Berhasil di Copy')

    setTimeout(function () {
        jQuery(el).html(`<i class="fas fa-reguler fa-copy"></i> copy`)
    }, 2000)
}

 document.getElementById('rsvpForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Mencegah reload halaman

        // Ambil data dari form
        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const message = document.getElementById('message').value;

        // Format pesan untuk WhatsApp
        const waMessage = `Halo, ini RSVP saya:%0A%0ANama: ${name}%0AKehadiran: ${attendance}%0APesan: ${message}`;

        // Nomor WhatsApp tujuan (format: 62 untuk kode Indonesia)
        const waNumber = '6281234567890'; // Ganti dengan nomor tujuan

        // Buat URL WhatsApp
        const waURL = `https://wa.me/${waNumber}?text=${waMessage}`;

        // Buka WhatsApp Web
        window.open(waURL, '_blank');
    });