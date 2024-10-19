import axios from 'axios'
import { HOST_NODEJS } from '../constants'

const uploadPicture = async (picture, title) => {
  try {
    const endpoint = `${HOST_NODEJS}exercises/upload/`
    const formData = new FormData()
    formData.append('picture', {
      uri: picture.uri,
      type: 'image/jpeg',
      name: title
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: () => {
        return formData
      }
    }

    const response = await axios.post(endpoint, formData, config)

    if (response.status === 200) {
    //   console.log(response.data)
    } else {
      console.log(response.statusText)
    }
  } catch (error) {}
}

export default uploadPicture
