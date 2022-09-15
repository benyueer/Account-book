export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Account_Type {
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD'
}

export type Account = {
  __typename?: 'Account';
  costCount: Scalars['Float'];
  id: Scalars['Float'];
  incomeCount: Scalars['Float'];
  name: Scalars['String'];
  no: Scalars['String'];
  overage: Scalars['Float'];
  type: Account_Type;
  userId: Scalars['Float'];
};

export type AccountInput = {
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  no?: InputMaybe<Scalars['String']>;
  overage?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Account_Type>;
  userId?: InputMaybe<Scalars['Float']>;
};

export enum Base_Type {
  In = 'IN',
  Out = 'OUT'
}

export type ConsumptionType = {
  __typename?: 'ConsumptionType';
  baseType: Scalars['Float'];
  createBy: Scalars['Float'];
  familyId: Scalars['Float'];
  id: Scalars['Float'];
  name: Scalars['String'];
  pid: Scalars['Float'];
};

export type ConsumptionTypeItem = {
  __typename?: 'ConsumptionTypeItem';
  baseType: Base_Type;
  children?: Maybe<Array<ConsumptionTypeItem>>;
  id: Scalars['Float'];
  name: Scalars['String'];
  pid: Scalars['Float'];
};

export type CreateTypeInput = {
  baseType?: InputMaybe<Base_Type>;
  familyId?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  pid?: InputMaybe<Scalars['Float']>;
};

export type CreateUserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Family = {
  __typename?: 'Family';
  id: Scalars['Float'];
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Account;
  createConsumptionType: ConsumptionType;
  createUser: User;
  login: Token;
  updateAccount: Account;
  updateConsumptionType: ConsumptionType;
};


export type MutationCreateAccountArgs = {
  data: AccountInput;
};


export type MutationCreateConsumptionTypeArgs = {
  data: CreateTypeInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationLoginArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  data: AccountInput;
};


export type MutationUpdateConsumptionTypeArgs = {
  data: CreateTypeInput;
};

export type Query = {
  __typename?: 'Query';
  getConsumptionType: Array<ConsumptionTypeItem>;
  queryById: User;
  queryUserByName: User;
};


export type QueryGetConsumptionTypeArgs = {
  familyId?: InputMaybe<Scalars['Float']>;
};


export type QueryQueryByIdArgs = {
  id: Scalars['Float'];
};


export type QueryQueryUserByNameArgs = {
  name: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  access_token?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  familyId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  accounts?: Maybe<Array<Scalars['Float']>>;
  avatar?: Maybe<Scalars['String']>;
  family?: Maybe<Family>;
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};
