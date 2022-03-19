import { eth, getInstance } from './provider';

import UserStorage from "./artifacts/UserStorage.json";
import UserController from "./artifacts/UserController.json";
import Web3 from 'web3';

export const getUserInfo = async (userId) => {
  const storage = await getInstance(UserStorage)
  const profile = await storage.profiles.call(userId)

  const {
    id, 
    username, 
    firstName, 
    lastName, 
    bio, 
    gravatarEmail, 
  } = profile

  console.log(parseInt(id));
  console.log(username);

  if (!parseInt(id)) throw "Couldn't find user!"

  return {
    id: parseInt(id),
    username: username,
    firstName: firstName,
    lastName: lastName,
    bio,
    gravatarEmail,
  }
}

export const createUser = async (...params) => {
  try {
    const addresses = await window.ethereum.request({method: 'eth_requestAccounts'});
    const controller = await getInstance(UserController)

    const result = await controller.createUser(...params, {
      from: addresses[0],
    })
    console.log(result)
    return result;
  } catch (err) {
    console.error("SErr:", err)
  }
}



export const getLoggedInUserId = async () => {
  try {
    const addresses = await window.ethereum.request({method: 'eth_requestAccounts'});

    if (!addresses) return 

    const storage = await getInstance(UserStorage)
    const userId = await storage.addresses.call(addresses[0])
    const username = await storage.profiles.call(parseInt(userId))
    //console.log(username);
    console.log(parseInt(userId));

    return parseInt(userId)
  } catch (err) {
    console.error("Err:", err)
  }
}








