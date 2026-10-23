import { useState } from 'react'
import Icon from '../../components/UI/Icon'
import Kicker from '../../components/UI/Kicker'
import Button from '../../components/UI/Button'
import Sidebar from '../../components/Common/Sidebar'
import Header from '../../components/Common/Header'
import { getAvatarUrl, getCurrentAvatarGender, setAvatarGender } from '../../config/avatar'

export default function ProfilePage(props) {
  const { onNavigate, drawerOpen, onMenu, onClose, user, onLogout } = props
  const [gender, setGender] = useState(getCurrentAvatarGender)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const save = () => {
    setEditing(false)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }
  return (
    <section
      className="artboard app-screen profile-screen"
      aria-label="User profile screen"
    >
      <Sidebar
        active="profile"
        onNavigate={onNavigate}
        open={drawerOpen}
        onClose={onClose}
        user={user}
        onLogout={onLogout}
      />
      <main className="app-main">
        <Header section="Hồ sơ / Danh tính" onMenu={onMenu} />
        <div className="page profile-page">
          <div className="page-heading">
            <div>
              <Kicker>IDENTITY MODULE</Kicker>
              <h2>
                Operator profile<span>.</span>
              </h2>
              <p>Manage your public identity and security clearance.</p>
            </div>
            {editing ? (
              <Button variant="yellow" icon="check" onClick={save}>
                SAVE CHANGES
              </Button>
            ) : (
              <Button
                variant="light"
                icon="edit"
                onClick={() => setEditing(true)}
              >
                EDIT PROFILE
              </Button>
            )}
          </div>
          <div className="profile-grid">
            <div className="id-column">
              <div className="id-offset" />
              <div className="id-card">
                <div className="id-top">
                  <span>CLOUDCVHUB / ID</span>
                  <b>PRO</b>
                </div>
                <div className="avatar-large">
                  <img
                    src={getAvatarUrl(gender)}
                    alt="Operator Avatar"
                  />
                  <i />
                </div>
                <div className="avatar-gender-switcher" role="group" aria-label="Chọn avatar Nam hoặc Nữ">
                  <button
                    type="button"
                    className={`btn-pill ${gender === 'male' ? 'active' : ''}`}
                    onClick={() => {
                      setGender('male')
                      setAvatarGender('male')
                    }}
                    title="Avatar Đàn ông (Nam)"
                  >
                    👨 Nam
                  </button>
                  <button
                    type="button"
                    className={`btn-pill ${gender === 'female' ? 'active' : ''}`}
                    onClick={() => {
                      setGender('female')
                      setAvatarGender('female')
                    }}
                    title="Avatar Đàn bà (Nữ)"
                  >
                    👩 Nữ
                  </button>
                </div>
                <h3>
                  MINH
                  <br />
                  <span>ANH</span>
                </h3>
                <p>SENIOR PRODUCT DESIGNER • HÀ NỘI</p>
                <div className="id-code">
                  <span>
                    <b>ID:</b> CCH-8842-MA
                  </span>
                  <span>
                    <b>LOC:</b> HAN / UTC+7
                  </span>
                </div>
                <div className="barcode">IIII II IIII I II III IIII II</div>
                <div className="id-verified">
                  <Icon name="shield" /> IDENTITY VERIFIED <span>2025</span>
                </div>
              </div>
              <div className="id-caption">
                <span>01</span>
                <p>
                  DIGITAL OPERATOR BADGE
                  <br />
                  <small>ISSUED 02.14.2024</small>
                </p>
              </div>
            </div>
            <div className="profile-content">
              {/* 1. Core Specifications Panel with Dashed Frame */}
              <div className="neo-dashed-card group relative block">
                <span className="absolute inset-0 border-2 border-dashed border-black pointer-events-none" aria-hidden="true" />
                <div className="relative border-2 border-black bg-[#fffdf8] transition-transform duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 spec-panel shadow-[4px_4px_0_#000]">
                  <div className="panel-heading">
                    <span>
                      <Kicker>CORE SPECIFICATIONS</Kicker>
                      <h3>Identity data</h3>
                    </span>
                    <b>02 / PROFILE</b>
                  </div>
                  <div className="spec-grid">
                    <div className="input__container" data-label="DISPLAY NAME">
                      <div className="shadow__input" />
                      <input
                        className="input__search"
                        defaultValue="Nguyễn Minh Anh"
                        readOnly={!editing}
                        placeholder="Họ và tên..."
                      />
                    </div>

                    <div className="input__container" data-label="ROLE / TITLE">
                      <div className="shadow__input" />
                      <input
                        className="input__search"
                        defaultValue="Senior Product Designer"
                        readOnly={!editing}
                        placeholder="Chức vụ / Vị trí..."
                      />
                    </div>

                    <div className="input__container" data-label="PRIMARY EMAIL">
                      <div className="shadow__input" />
                      <input
                        className="input__search"
                        defaultValue="minhanh@cloudcvhub.vn"
                        readOnly={!editing}
                        placeholder="Email liên hệ..."
                      />
                    </div>

                    <div className="input__container" data-label="BASE LOCATION">
                      <div className="shadow__input" />
                      <input
                        className="input__search"
                        defaultValue="Hà Nội, Việt Nam"
                        readOnly={!editing}
                        placeholder="Địa điểm làm việc..."
                      />
                    </div>

                    <div className="input__container wide" data-label="PUBLIC PROFILE URL">
                      <div className="shadow__input" />
                      <div className="url-prefix-box">
                        <code>cloudcvhub.dev/u/</code>
                      </div>
                      <input
                        className="input__search"
                        defaultValue="nguyen-minh-anh"
                        readOnly={!editing}
                        placeholder="duong-dan-ho-so"
                      />
                      <button
                        type="button"
                        className="input__button__shadow"
                        aria-label="Sao chép liên kết hồ sơ"
                        title="Sao chép liên kết hồ sơ"
                        onClick={() => {
                          navigator.clipboard?.writeText("https://cloudcvhub.dev/u/nguyen-minh-anh");
                          alert("Đã sao chép liên kết hồ sơ vào bộ nhớ tạm!");
                        }}
                      >
                        <Icon name="link" size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Security Capabilities Panel with Dashed Frame */}
              <div className="neo-dashed-card group relative block">
                <span className="absolute inset-0 border-2 border-dashed border-black pointer-events-none" aria-hidden="true" />
                <div className="relative border-2 border-black bg-[#fffdf8] transition-transform duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 security-panel shadow-[4px_4px_0_#000]">
                  <div className="panel-heading">
                    <span>
                      <Kicker>SECURITY CAPABILITIES</Kicker>
                      <h3>Access & protection</h3>
                    </span>
                    <div className="clearance">
                      <i /> CLEARANCE: MAX
                    </div>
                  </div>
                  <div className="capability-list">
                    <div>
                      <span className="cap-icon">
                        <Icon name="lock" />
                      </span>
                      <span>
                        <b>TWO-FACTOR AUTHENTICATION</b>
                        <small>Authenticator app enabled</small>
                      </span>
                      <i className="status live">ACTIVE</i>
                      <button type="button">
                        MANAGE <Icon name="arrow" size={14} />
                      </button>
                    </div>
                    <div>
                      <span className="cap-icon yellow">
                        <Icon name="shield" />
                      </span>
                      <span>
                        <b>END-TO-END ENCRYPTION</b>
                        <small>AES-256 / All vault documents</small>
                      </span>
                      <i className="status live">ENFORCED</i>
                      <button type="button">
                        DETAILS <Icon name="arrow" size={14} />
                      </button>
                    </div>
                    <div>
                      <span className="cap-icon">
                        <Icon name="history" />
                      </span>
                      <span>
                        <b>SESSION CONTROL</b>
                        <small>3 authorized devices</small>
                      </span>
                      <i className="status draft">3 DEVICES</i>
                      <button type="button">
                        REVIEW <Icon name="arrow" size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="security-foot">
                    <span>
                      <Icon name="check" /> LAST SECURITY AUDIT: 12 MAY 2025
                    </span>
                    <b>NO ANOMALIES DETECTED</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {saved && (
        <div className="toast">
          <Icon name="check" /> PROFILE SPECIFICATIONS UPDATED
        </div>
      )}
    </section>
  )
}
