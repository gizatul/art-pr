//Создаем ф-ю отправки данных POST-запрос
    const postData = async (url, data) => { //асинхронная ф-я - async
        let res = await fetch(url, { //асинхронная операция await, чтобы JS дождался выполнения операции, т.к. ответ от сервера может идти долго
            method: 'POST',
            body: data,
        });
        return await res.text(); //возврат текстовых данных(в данном случае, тоже ждем окончания операции (await)
    };

    // Ф-я получения данных GET-запрос
    const getResource = async (url) => { //асинхронная ф-я - async
        let res = await fetch(url);

        if (!res.ok) { //Если что-то не ок
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); //то выброс(throw) ошибки
        }   
        return await res.json(); //возврат текстовых данных(в данном случае, тоже ждем окончания операции (await)
    };
export {postData, getResource};