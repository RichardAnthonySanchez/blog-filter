import  clientPromise  from '@lib/mongo/index'

export const GET = async () => { //the GET name can't be changed for AJAX request
    try {
        const posts = await clientPromise()

        return new Response(JSON.stringify(posts, null, 2), { status:200 })

    } catch (error) {
        return new Response('failed to fetch all posts', { status:500 })

    }
}