import prisma from "./prisma.js";

export async function verifyLogin(user,pass){
   const userRecord = await prisma.user.findUnique({
        where: {
            userName: user,
            password: pass,
        },
    });

    if(userRecord)
        return "found";
    else
        return "not found";
};

export async function changeUserActive(userName,isActive){
   const userRecord = await prisma.user.update({
        where: {
            userName,
        },
        data:{
            active:isActive,
        },
    });

   return userRecord;
};

export async function getActiveUserName(){
    const userName = await prisma.user.findFirst({
        where: {
            active:true,
        },
        select:{
            userName:true,
        }
    });

   return userName.userName;
}

export async function createCartItem(nameProduct,price,quantity){
    const cartItemRecord = await prisma.cartItem.create({
        data:{
           nameProduct,
            price,
            quantity 
        }
    });

    return cartItemRecord;
};

export async function createSaleHistory(userName,nameProduct,price,quantity){
    const saleHistoryRecord = await prisma.saleHistory.create({
        data:{
            userName,
            nameProduct,
            price,
            quantity 
        }
    });

    return saleHistoryRecord;
}

export async function getSaleHistoryPerUser(userName){
     const saleHistoryRecords = await prisma.saleHistory.findMany({
        where:{
            userName
        }
    });

    return saleHistoryRecords.length == 0 ?  [] : saleHistoryRecords;
};

export async function addBalance(userName,amount){
    const updatedUserRecord = await prisma.user.update({
        where:{
            userName
        },
        data:{
            balance:{
                increment: amount
            }
        }
    });
    return updatedUserRecord;
};

export async function reduceBalance(userName,amount){
    const balanceObject = await prisma.user.findUnique({
        where:{
            userName
        },
        select:{
            balance:true
        }
    });
    const balance = balanceObject.balance;
    const newBalance= balance -amount;
    if(balance -amount < 0)
        return;
    const updatedUserRecord=await prisma.user.update({
        where:{
            userName
        },
        data:{
            balance:newBalance
        }
    });
    return updatedUserRecord;
};

export async function getBalance(userName){
    const balanceObject = await prisma.user.findUnique({
        where:{
            userName
        },
        select:{
            balance:true
        }
    });
    if(balanceObject)
        return balanceObject.balance;
    else{
        return null;
    }
    
};

export async function getUserName(userName){
    const userNameObject = await prisma.user.findUnique({
        where:{
            userName
        },
        select:{
            userName:true
        }
    });
    if(userNameObject)
        return userNameObject.userName;
    else{
        return null;
    }
};

export async function getEmail(userName){
    const emailObject = await prisma.user.findUnique({
        where:{
            userName
        },
        select:{
            email:true
        }
    });
    if(emailObject)
        return emailObject.email;
    else{
        return null;
    }
};

export async function getFirstName(userName){
    const firstNameObject = await prisma.user.findUnique({
        where:{
            userName
        },
        select:{
            firstName:true
        }
    });
    if(firstNameObject)
        return firstNameObject.firstName;
    else{
        return null;
    }
};

export async function getLastName(userName){
    const lastNameObject = await prisma.user.findUnique({
        where:{
            userName
        },
        select:{
            lastName:true
        }
    });
    if(lastNameObject)
        return lastNameObject.lastName;
    else{
        return null;
    }
};

export async function getShippingAddress(userName){
    const shippingObject = await prisma.user.findUnique({
        where:{
            userName
        },
        select:{
            shipping:true
        }
    });
    if(shippingObject)
        return shippingObject.shipping;
    else{
        return null;
    }
};

export async function getBankAccount(userName){
    const bankAccountObject = await prisma.user.findUnique({
        where:{
            userName
        },
        select:{
            bankAccount:true
        }
    });
    if(bankAccountObject)
        return bankAccountObject.bankAccount;
    else{
        return null;
    }
};

export async function getTypeOfAccount(userName){
    const typeOfAccount = await prisma.user.findUnique({
        where:{
            userName
        },
        select:{
            typeOfAccount:true
        }
    });
    if(typeOfAccount)
        return typeOfAccount.typeOfAccount;
    else{
        return null;
    }
};



export async function modifyUser(userName,data){
    const modifiedUser = await prisma.user.update({
        where:{
            userName
        },
        data: data
    });
    return modifiedUser;
};

export async function getUserNameFromSeller(userName){
    const userNameObject = await prisma.seller.findUnique({
        where:{
            userName
        },
        select:{
            userName:true
        }
    });
    if(userNameObject)
        return userNameObject.userName;
    else{
        return null;
    }
};

export async function getCompanyNameFromSeller(userName){
    const companyNameObject = await prisma.seller.findUnique({
        where:{
            userName
        },
        select:{
            companyName:true
        }
    });
    if(companyNameObject)
        return companyNameObject.companyName;
    else{
        return null;
    }
};

export async function getBankAccountFromSeller(userName){
    const bankAccountObject = await prisma.seller.findUnique({
        where:{
            userName
        },
        select:{
            bankAccount:true
        }
    });
    if(bankAccountObject)
        return bankAccountObject.bankAccount;
    else{
        return null;
    }
};

export async function getItemsPerSeller(userName){
    const itemsOfSeller = await prisma.seller.findUnique({
        where:{
            userName
        },
        select:{
            items:true
        }
    });
    if(itemsOfSeller){
        const itemsArray = itemsOfSeller.items;
        return itemsArray.length ==0 ? []: itemsArray;
    }
    else{
        return [];
    }
    
    
};

export async function getAllNameProduct(){
    const nameProduct = await prisma.item.findMany({
        select:{
            nameProduct:true
        }
    });
    if(nameProduct.length >0){
        const nameProductsArray=nameProduct.map((product) => product.nameProduct);
        return nameProductsArray;
    }
    else{
        return [];
    }
    
};

export async function getAllItems(){
    const items = await prisma.item.findMany({

    });
    return items;
};

export async function getItemQuantity(nameProduct){
    const quantity = await prisma.item.findUnique({
        where:{
            nameProduct,
        },
        select:{
            quantity:true,
        }
    });
    return quantity.quantity;
};

export async function updateItemQuantity(nameProduct,quantity){
    const newQuantity = await prisma.item.update({
        where:{
            nameProduct,
        },
        data:{
            quantity,
        }
    });
    return newQuantity.quantity;
};

export async function getCartItems(){
    const cartItems = await prisma.cartItem.findMany({

    });
    return cartItems;
};

export async function getCartItemNameProduct(id){
    const nameProduct = await prisma.cartItem.findUnique({
        where:{
            id,
        }
    });
    return nameProduct;
};
export async function getCartItemPrice(nameProduct){
    const priceOfItem = await prisma.cartItem.findUnique({
        where:{
            nameProduct,
        },select:{
            price:true,
        }
    });
    return priceOfItem.price;
};

export async function getCartItemQuantity(nameProduct){
    const priceOfItem = await prisma.cartItem.findUnique({
        where:{
            nameProduct,
        },select:{
            quantity:true,
        }
    });
    return priceOfItem.quantity;
};

export async function addCartItem(nameProduct,price,quantity){
    const isExist=await prisma.cartItem.findUnique({
        where:{
            nameProduct,
        }
    });
    if(isExist){
         const cartItem=await prisma.cartItem.update({
        where:{
            nameProduct,
        },
        data:{
            quantity,
        }
    });
    return cartItem;
    }else{
        const cartItem = await prisma.cartItem.create({
        data:{
            nameProduct,
            price,
            quantity,

            }
        });
        return cartItem;
    }
    
};

export async function removeCartItem(nameProduct){
    const cartItem = await prisma.cartItem.delete({
        where:{
            nameProduct
        }
    });
    return cartItem;
};

export async function removeAllCartItems(){
    const cartItems = await prisma.cartItem.deleteMany({
        
    });
    return cartItems;
};

export async function updateCartItemQuantity(nameProduct,quantity){
    const item = await prisma.cartItem.update({
        where:{
            nameProduct,
        },
        data:{
            quantity
        }
    });
    return item;
};

export async function updateCartItemPrice(nameProduct,price){
    const item = await prisma.cartItem.update({
        where:{
            nameProduct,
        },
        data:{
            price
        }
    });
    return item;
};

export async function getCartItemSumQuantity(){
    const sumResult = await prisma.cartItem.aggregate({
        _sum: {
          quantity: true,
        },
    });
    return sumResult._sum;
};


// console.log(await getSaleHistoryPerUser("user1"));
