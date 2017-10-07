class Tools{
	static convertScore(score){
		if(score > 85) {
			return 'A'
		}
		else if(score > 70) {
			return 'B'
		}
		else if(score > 55) {
			return 'C'
		}
		else if(score <= 85) {
			return 'E'
		}
	}
}
module.exports = Tools