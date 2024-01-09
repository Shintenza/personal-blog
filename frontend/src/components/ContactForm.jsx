"use client";
import style from "@styles/ContactForm.module.css";
import { useState } from "react";
import sendEmail from "@utils/sendMail";
import PageSpinner from "./PageSpinner";

const DEST_ADDRESS = "kam.kuziora@gmail.com";

const ContactForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const checkTitle = () => title.length >= 5 && title.length <= 100;
  const checkFirstName = () => firstName.length >= 2;
  const checkEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const checkContent = () => content.length > 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !checkTitle() ||
      !checkFirstName() ||
      !checkEmail() ||
      !checkContent()
    ) {
      setIsError(true);
      return;
    }

    setIsSending(true);
    const response = await fetch(`https://formsubmit.co/ajax/${DEST_ADDRESS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ firstName, email, title, content }),
    });
    setIsSending(false);
    setMessageSent(true)
  };

  if (isSending) {
    return <PageSpinner />;
  }

  if (messageSent) {
    return <h1 className="text-4xl text-center">Your message has been sent :)</h1>;
  }

  return (
    <form className="flex flex-col gap-4">
      <label htmlFor="first_name">First name</label>
      <input
        type="text"
        name="first_name"
        id="first_name"
        className={style.form_input}
        placeholder="Share your beautiful name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      {isError && !checkFirstName() && (
        <p className="text-red-400">
          Name field has to contain at least 2 characters
        </p>
      )}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className={style.form_input}
        placeholder="E.g. speedy@carrot.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {isError && !checkEmail() && (
        <p className="text-red-400">Not valid email address</p>
      )}
      <label htmlFor="title">Message title</label>
      <input
        type="text"
        name="title"
        id="title"
        className={style.form_input}
        placeholder="What is the title of your message"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isError && !checkTitle() && (
        <p className="text-red-400">
          Valid messeage title should have 5 to 100 characters
        </p>
      )}
      <label htmlFor="content">Message content</label>
      <textarea
        name="content"
        id="content"
        cols="30"
        rows="6"
        className={style.contact_area}
        value={content}
        placeholder="Tell me something interesting"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      {isError && !checkContent() && (
        <p className="text-red-400">Message content is too short</p>
      )}

      <button
        onClick={handleSubmit}
        className="p-4 border-white border-2 border-solid hover:text-black hover:bg-white"
      >
        Wyślij
      </button>
    </form>
  );
};

export default ContactForm;
