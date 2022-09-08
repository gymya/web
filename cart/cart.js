var vm = new Vue({
    el: "#app",
    data:{
        cart_open: false,
        items:[
            {
                name: "Rick and Morty",
                image: "https://m.media-amazon.com/images/I/61rFf3FHRcL._AC_.jpg",
                introduce: "An animated series that follows the exploits of a super scientist and his not-so-bright grandson.",
                amount: 3,
                in_cart: 0,
                price: 500
            },
            {
                name: "Fight Club",
                image: "https://www.flore-maquin.com/wp-content/uploads/Fight_club_RVB_72.jpg",
                introduce: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
                amount: 1,
                in_cart: 0,
                price: 100
            },
            {
                name: "Evangelion",
                image: "https://m.media-amazon.com/images/M/MV5BODZkZjUxNmEtMGEyOS00ZDY5LTkxZDMtZTJkZDBiZTkyOWRkXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
                introduce: "A teenage boy finds himself recruited as a member of an elite team of pilots by his father.",
                amount: 3,
                in_cart: 0,
                price: 400
            },
            {
                name: "Inside Job",
                image: "https://www.themoviedb.org/t/p/w500/qwJUDMJ4i3KBYjeUFK9Js87iJEa.jpg",
                introduce: "Lizard people? Real. The moon landing? Fake. Managing the world's conspiracies is a full-time job for an awkward genius and her dysfunctional co-workers.",
                amount: 2,
                in_cart: 0,
                price: 300
            }
        ],
    },
    methods: {
        bgcss(url){
            return {
                'background-image': 'url('+url+')',
                'background-size': 'cover',
                'background-position': 'center center'
            }
        },
        add_cart(obj){
            if(obj.amount>0){
                obj.amount -= 1;
                obj.in_cart += 1;
            }else{
                alert("下次一定補貨");
            }
        },
        remove_cart(obj){
            obj.amount += 1;
            obj.in_cart -= 1;
        }
    },
    computed: {
        cart_amount(){
            return this.items
                .map(element => element.in_cart)
                .reduce((total,p)=>total+p,0)
        },
        total_price(){
            return this.items
                .map(element => element.in_cart*element.price)
                .reduce((total,p)=>total+p,0)
        }
    },
})