console.log('Hello JS')
// window.sr = ScrollReveal();
// sr.reveal('.headline', {
//     reset: true
// })
const instace = new Vue({
    el: '#app',
    data: {
        Hyms: HimnarioCompletoMasCorrelacion,
        search: '',
        MainPath: 'C:\\Users\\IASD Sabanita\\Music\\Música\\Himnario Adventista\\',
        Path: '',
        Current: {},
        Volume: 0.75,
        isActive: true,
        CurrentDurationPorce: 0,
        Duration: 0,
        CurrentTime: 0,
        source: ''
    },
    methods: {
        NumberHym(Hym) {
            const number = Hym.toString()
            return number.length == 1 ? '00' + number : number.length == 2 ? '0' + number : number == 'false' ? '---' : number
        },
        NameHym(Hym) {
            return (Hym.name).slice(5, -4)
        },
        Load(status, Hym) {
            const PathHym = status == 'HNC' ? this.MainPath + 'Himnario Nuevo\\Musica\\Cantado\\' + Hym.name : status == 'HNI' ? this.MainPath + 'Himnario Nuevo\\Musica\\Instrumental\\' + Hym.name : this.MainPath + 'Himnario Antiguo\\' + this.NumberHym(Hym.HimnarioAntiguo.number) + Hym.name.slice(3)
            this.Path = PathHym
            this.Current = {
                new: Hym.name.slice(0, 3),
                name: Hym.name.slice(6, -4),
                old: this.NumberHym(Hym.HimnarioAntiguo.number)
            }
            window.scroll({
                top: 0,
                behavior: 'smooth'
            })
            this.source = this.Path;
            this.$refs.audio.play();
            this.isActive = true
        },
        NewPosition() {
            window.scroll({
                top: this.search == '' || this.Path == '' ? 0 : 340,
                behavior: 'smooth'
            })
        },
        VolumeSize() {
            player.volume = this.Volume
        },
        PlayPause() {
            if (player.paused) {
                this.isActive = !this.isActive
                return player.play();
            } else {
                this.isActive = !this.isActive
                return player.pause();
            }
        },
        SecondsToString(seconds) {
            var hour = '';
            if (seconds > 3600) {
                hour = Math.floor(seconds / 3600);
                hour = (hour < 10) ? '0' + hour : hour;
                hour += ':'
            }
            var minute = Math.floor((seconds / 60) % 60);
            minute = (minute < 10) ? '0' + minute : minute;
            var second = seconds % 60;
            second = (second < 10) ? '0' + second : second;
            return hour + minute + ':' + second;
        },
        UpdateProgress() {
            this.CurrentDurationPorce = ((player.currentTime / player.duration) * 100).toFixed(0)
            var durationSeconds = player.duration.toFixed(0);
            duration = this.SecondsToString(durationSeconds)
            var currentSeconds = player.currentTime.toFixed(0);
            current = this.SecondsToString(currentSeconds)
            this.CurrentTime = current
            this.Duration = duration
        },
        UpdateCurrent() {
            // const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
	        // player.currentTime = scrubTime;
            // this.CurrentTime = scrubTime
            // console.log(this.$refs)
        }

    },
    computed: {
        SearchHyms() {
            return this.Hyms.filter(Hym => {
                return Hym.name.toLowerCase().includes(this.search.toLowerCase());
            })
        }
    },
})