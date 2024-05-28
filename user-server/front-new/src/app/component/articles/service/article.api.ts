import  instance  from '@/app/component/common/configs/axios-config'

export const AllArticlesAPI = async (page: number) => {
    try {
        const response = await instance().get('/articles/list', {
            params: { page:20, limit: 20 } //1page 당 10 게시글
        })
        return response.data
    } catch (error) {
        console.log(error + " AllArticlesAPI EERR!!!")
        return error
    }
}

export const mylistArticlesAPI = async (id: number) => {
    try {
        const response = await instance().get('/articles/mylist', {
            params: {id} //1page 당 10 게시글
        })
        return response.data
    } catch (error) {
        console.log(error + " mylistArticlesAPI EERR!!!")
        return error
    }
}

export const findArticlesAPI = async (id: number) => {
    try {
        const response = await instance().get('/articles/detail', {
            params: { id }
        })
        console.log("findArticlesAPI response : " + response.data)
        return response.data
    } catch (error) {
        console.log(error + " findArticlesAPI EERR!!!")
        return error
    }
}

export const countArticlesAPI = async () => {
    try {
        const response = await instance().get('/articles/count')
        console.log("count response " + response.data)
        return response.data
    } catch (error) {
        console.log(error + " countArticlesAPI EERR!!!")
        return error
    }

}

export const modifyArticlesAPI = async (props: IArticle) => {
    try {
        const response = await instance().put('/articles/modify',props)
        console.log("response " + JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log(error + " modifyArticlesAPI EERR!!!")
        return error
    }
}


export const deleteArticlesAPI = async (id: number) => {
    try {
        const response = await instance().delete('/articles/delete', {
            params: { id }
        })
        return response.data
    } catch (error) {
        console.log(error + " deleteArticlesAPI EERR!!!")
        return error
    }
}

export const saveArticleAPI = async (props: any) => {
    try {
        const response = await instance().post('/articles/save', props)
        console.log("response ", JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log(error, " saveArticleAPI EERR!!!")
        return error
    }
}

export const findByBoardIdAPI = async (id: number) => {
    try {
        const response = await instance().get('/articles/card', {
            params: { id }
        })
        return response.data
    } catch (error) {
        console.log(error + " findByBoardIdAPI EERR!!!")
        return error
    }
}