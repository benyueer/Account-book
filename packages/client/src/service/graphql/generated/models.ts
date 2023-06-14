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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export enum Account_Type {
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD'
}

export type Account = {
  __typename?: 'Account';
  costCount: Scalars['Float'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  incomeCount: Scalars['Float'];
  name: Scalars['String'];
  no: Scalars['String'];
  overage: Scalars['Float'];
  type: Account_Type;
  user: User;
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
  icon?: Maybe<Scalars['String']>;
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
  createRecord: Record;
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


export type MutationCreateRecordArgs = {
  data: RecordInput;
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
  getFamilyMembers: Array<User>;
  queryAccountListByUserId: Array<Account>;
  queryById: User;
  queryUserByName: User;
  recordList: Array<Record>;
};


export type QueryGetConsumptionTypeArgs = {
  familyId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetFamilyMembersArgs = {
  id: Scalars['Float'];
};


export type QueryQueryAccountListByUserIdArgs = {
  userId: Scalars['Float'];
};


export type QueryQueryByIdArgs = {
  id: Scalars['Float'];
};


export type QueryQueryUserByNameArgs = {
  name: Scalars['String'];
};


export type QueryRecordListArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  userIds: Array<Scalars['Float']>;
};

export enum Record_Type {
  In = 'IN',
  Out = 'OUT'
}

export type Record = {
  __typename?: 'Record';
  account: Account;
  amount: Scalars['Float'];
  consumptionType: Scalars['Float'];
  date: Scalars['DateTime'];
  id: Scalars['Float'];
  imgs?: Maybe<Array<Scalars['String']>>;
  remark?: Maybe<Scalars['String']>;
  type: Record_Type;
  users: User;
};

export type RecordInput = {
  account: Scalars['Float'];
  consumptionType: Scalars['Float'];
  date: Scalars['DateTime'];
  imgs?: InputMaybe<Array<Scalars['String']>>;
  members: Array<Scalars['Float']>;
  remark: Scalars['String'];
  type: Record_Type;
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
