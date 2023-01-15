<template>
    <div class="container">
        <h1>Match3!</h1>
        <div class="content">
            <div class="form">
                <div class="txt_field">
                    <input type="text" v-model="username"/>
                    <span></span>
                    <label>Username</label>
                </div>
                <div class="txt_field">
                    <input type="password" v-model="password"/>
                    <span></span>
                    <label>Password</label>
                </div>
                <div class="txt_field">
                    <input type="email" v-model="email"/>
                    <span></span>
                    <label>Email</label>
                </div>
                <button @click="register">Register</button>
            </div>
        </div>
        <p class="error">{{error}}</p>
</div>
</template>

<script>
    import axios from 'axios';
    import { useRouter } from 'vue-router';

    let router;
    
    async function register(){
        if(!this.username || !this.password || !this.email){
            this.error = 'Missing username or Password';
            return;
        }

        let paylod = { 
            email: this.email,
            password: this.password,
            username: this.username
        }
        let res = await axios.post('http://localhost:9090/users', paylod);

        if(res.status != 403){
            this.userToken = res.data.token; 
            router.push('/home')
        }else{
            this.error = "Failed to login";
        }
    }

    export default {
        setup(){
            router = useRouter();
        },
        data() {
            return {
                email: "",
                username: "",
                error: '',
                password: "",
                userToken: "",
            }
        },
        methods: {
            register
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: montserrat;
    }

    .container {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 1vh;
        display: grid;
        place-content: center;
        font-family: 'Poppins';
        color: white;
    }

    .content {
        display: flex;
        gap: 5em;
        width: 100%;
        padding-top: 1em;
        position: relative;
    }

    .content:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid white;
    }

    h1 {
        font-size: 4rem;
        width: 50vw;
        line-height: 97%;
        text-align: left;
    }

    h1, p {
        flex-basis: 0;
        flex-grow: 1;
    }

    p {
        font-size: 1.3;
        width: 40vw;
    }

    .form  .txt_field{
        position: relative;
        border-bottom: 2px solid #adadad;
        margin: 30px 0;
    }

    .txt_field input{
        width: 100%;
        padding: 0 5px;
        height: 40px;
        font-size: 16px;
        border: none;
        background: none;
        outline: none;
        color: white;
    }

    .txt_field label{
        position: absolute;
        top: 50%;
        left: 5px;
        color: white;
        transform: translateY(-50%);
        font-size: 16px;
        pointer-events: none;
        transition: .5s;
    }

    .txt_field span::before {
        content: '';
        position: absolute;
        top: 40px;
        left: 0;
        width: 0%;
        height: 2px;
        background: white;
        transition: .5s;
    }

    .txt_field input:focus ~ label,
    .txt_field input:valid ~ label{
        top: -5px;
        color: white;
    }

    .txt_field input:focus ~ span::before,
    .txt_field input:valid ~ span::before{
        width: 100%;
    }

    button{
        width: 100%;
        height: 50px;
        border: 1px solid;
        border-radius: 25px;
        background: transparent;
        color: white;
        font-weight: 700;
        cursor: pointer;
        outline: none;
        text-align: center;
    }

    button:hover{
        border-color: gray;
        transition: .5s;
    }

    .error {
        padding-top: 1rem;
    }
</style>